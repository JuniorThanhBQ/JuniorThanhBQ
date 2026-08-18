//go:build mage
// +build mage

package main

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"os/signal"
	"sync"
)

func InstallDeps() error {
	fmt.Println("Installing backend dependencies...")
	if err := runCmd("npm", "install", "--prefix", "server"); err != nil {
		return err
	}
	fmt.Println("Installing frontend dependencies...")
	if err := runCmd("npm", "install", "--prefix", "web"); err != nil {
		return err
	}
	return nil
}

func Build() error {
	fmt.Println("Building backend...")
	if err := runCmd("npm", "run", "build", "--prefix", "server"); err != nil {
		return err
	}
	fmt.Println("Building frontend...")
	if err := runCmd("npm", "run", "build", "--prefix", "web"); err != nil {
		return err
	}
	return nil
}

func Lint() error {
	fmt.Println("Linting backend...")
	if err := runCmd("npm", "run", "lint", "--prefix", "server"); err != nil {
		fmt.Println("Backend linting issues found")
	}
	fmt.Println("Linting frontend...")
	if err := runCmd("npm", "run", "lint", "--prefix", "web"); err != nil {
		fmt.Println("Frontend linting issues found")
	}
	return nil
}

func Test() error {
	fmt.Println("Testing backend...")
	if err := runCmd("npm", "run", "test", "--prefix", "server"); err != nil {
		return err
	}
	return nil
}

func runCmd(cmdName string, args ...string) error {
	cmd := exec.Command(cmdName, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

func Run() error {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		<-c
		fmt.Println("\nReceived interrupt, stopping all services...")
		cancel()
	}()

	var wg sync.WaitGroup
	wg.Add(2)

	errCh := make(chan error, 2)

	go func() {
		defer wg.Done()
		fmt.Println("Starting backend...")
		cmd := exec.CommandContext(ctx, "npm", "run", "start:dev", "--prefix", "server")
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		if err := cmd.Run(); err != nil {
			errCh <- fmt.Errorf("backend exited: %v", err)
			cancel()
		}
	}()

	go func() {
		defer wg.Done()
		fmt.Println("Starting frontend...")
		cmd := exec.CommandContext(ctx, "npm", "run", "dev", "--prefix", "web")
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		if err := cmd.Run(); err != nil {
			errCh <- fmt.Errorf("frontend exited: %v", err)
			cancel()
		}
	}()

	wg.Wait()
	close(errCh)

	for err := range errCh {
		if err != nil && err.Error() != "signal: killed" {
			fmt.Println("Error:", err)
		}
	}
	return nil
}

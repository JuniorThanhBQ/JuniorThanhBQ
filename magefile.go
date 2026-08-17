//go:build mage
// +build mage

package main

import (
	"fmt"
	"os"
	"os/exec"
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
	fmt.Println("Testing frontend...")
	if err := runCmd("npm", "run", "test", "--prefix", "web"); err != nil {
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

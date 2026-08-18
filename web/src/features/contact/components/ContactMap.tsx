import { motion } from 'framer-motion'

export function ContactMap() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
    >
      <iframe
        title="Google Maps Location"
        width="100%"
        height="100%"
        className="w-full h-full border-0 grayscale opacity-60 dark:opacity-20 dark:invert contrast-[1.10] dark:contrast-[1.25] scale-[1.02] blur-[1px]"
        src="https://maps.google.com/maps?q=97%20V%C3%B5%20V%C4%83n%20T%E1%BA%A7n,%20Xu%C3%A2n%20H%C3%B2a,%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed"
      />
    </motion.div>
  )
}

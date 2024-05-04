import { type PropsWithChildren } from 'react';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '~/lib/utils';
import { ThemeProvider } from '~/components/theme-provider';
import '~/styles/globals.css';
import { Toaster } from '~/components/ui/sonner';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

export default function RootLayout({
  children,
}: Readonly<PropsWithChildren>): JSX.Element {
  return (
    <html lang="da" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

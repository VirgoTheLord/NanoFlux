// A reusable button component for this page, styled for a minimal aesthetic
const Button = ({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) => {
  const baseClasses =
    "inline-block rounded-md px-8 py-3 text-center font-medium transition-all duration-300";
  const variantClasses = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800",
    secondary:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700",
  };

  return (
    <a href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </a>
  );
};

// A reusable feature component, text-only
const Feature = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-transparent">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
      {children}
    </p>
  </div>
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800 dark:bg-black dark:text-gray-200 font-sans">
      {/* Header */}
      <header className="w-full">
        <div className="container mx-auto flex h-24 max-w-7xl items-center justify-between px-8">
          <a
            href="#"
            className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white"
          >
            nanoflux
          </a>
          <nav className="hidden items-center gap-10 text-base md:flex">
            <a
              href="#"
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
            >
              Docs
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center">
        {/* Hero Section */}
        <section className="w-full text-center py-28 sm:py-40">
          <div className="container mx-auto max-w-4xl px-8">
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl text-gray-900 dark:text-white">
              Automate Your Workflows
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
              The open-source platform for developers to connect APIs, automate
              tasks, and build powerful workflows with unparalleled ease and
              simplicity.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Button href="#" variant="primary">
                Get Started Free
              </Button>
              <Button href="#" variant="secondary">
                Read the Docs
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-gray-50 dark:bg-gray-900/50 py-28 sm:py-32">
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-x-12 gap-y-16 px-8 md:grid-cols-3">
            <Feature title="Visual Editor">
              Map out everything from simple integrations to complex, multi-step
              automations in minutes with our intuitive visual interface.
            </Feature>
            <Feature title="Limitless Connections">
              With a vast library of integrations, you can connect any API to
              any other service without writing a single line of code.
            </Feature>
            <Feature title="Developer First">
              Our editor is backed by powerful developer tools. Drop down to
              code for custom logic whenever you need to.
            </Feature>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-16 text-center sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Nanoflux, Inc. All rights reserved.
          </p>
          <div className="flex gap-x-8 text-sm text-gray-500 dark:text-gray-400">
            <a
              href="#"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-500"
            >
              GitHub
            </a>
            <a
              href="#"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-500"
            >
              Slack
            </a>
            <a
              href="#"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-500"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

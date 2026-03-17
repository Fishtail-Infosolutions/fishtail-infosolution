import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Fishtail Infosolutions.',
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl min-h-screen text-foreground">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-foreground/80">
          <p className="text-lg">
            Welcome to Fishtail Infosolutions. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">2. Services Description</h2>
            <p>
              Fishtail Infosolutions provides various IT and digital services, including but not limited to software development, web design, and IT consulting. We reserve the right to modify or discontinue, temporarily or permanently, any service with or without notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">3. User Obligations</h2>
            <p>
              As a condition of your use of the services, you agree not to use the services for any purpose that is unlawful or prohibited by these terms. You may not use the services in any manner that could damage, disable, overburden, or impair any server, or the network(s) connected to any server.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">4. Intellectual Property</h2>
            <p>
              The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">5. Limitation of Liability</h2>
            <p>
              In no event shall Fishtail Infosolutions or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Fishtail Infosolutions' website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">6. Revisions and Errata</h2>
            <p>
              The materials appearing on Fishtail Infosolutions' website could include technical, typographical, or photographic errors. Fishtail Infosolutions does not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">7. Governing Law</h2>
            <p>
              Any claim relating to Fishtail Infosolutions' website shall be governed by the laws of our operating jurisdiction without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: info@fishtailinfosolutions.com</li>
              <li>Address: Fishtail Infosolutions, Nepal</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

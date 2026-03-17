import { Socials } from '@/constants/socials';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="mt-8 md:mt-16 bg-secondary dark:bg-background/10 backdrop-blur-md text-foreground sm:pt-12 pt-8 pb-8 w-full border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Logo Section */}
        {/* <Link href="/">
          <div className="text-center mb-12">
            <img
              src="/fishtail-infosolutions-logo.png"
              alt="Company Logo"
              className="mx-auto h-20 object-contain"
            />
          </div>
        </Link> */}

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Contact Section */}
          <div>
            {/* <h3 className="text-lg font-semibold mb-6 text-violet-500">
              Contact
            </h3> */}
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-linear-to-br from-[#3b82f6] to-[#1d4ed8] dark:from-[#ABDCFF] dark:to-[#0396FF]">
              Contact
            </h3>

            <div className="space-y-4 mt-4">
              <div className="group">
                <span className="text-base">+977 9806673560</span>
              </div>

              <a href="mailto:info@fishtailinfosolutions.com/" target="_blank" rel="noopener noreferrer" className="block w-fit">
                <div className="group cursor-pointer w-fit">
                  <span className="text-base transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:to-[#0396FF]">info@fishtailinfosolutions.com</span>
                </div>
              </a>

              <div className="group">
                <div className="text-base">
                  <p>Sun to Fri: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-linear-to-br from-[#3b82f6] to-[#1d4ed8] dark:from-[#ABDCFF] dark:to-[#0396FF]">
              Quick Links
            </h3>
            <div className="space-y-4 mt-4">
              <Link href="/company" className="group text-base w-fit block">

                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Company</span>
              </Link>
              <Link href="/career" className="group text-base w-fit block">

                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Career</span>
              </Link>
              <Link href="/projects" className="group text-base w-fit block">
                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:to-[#0396FF]">Projects</span>
              </Link>
              <Link href="/blog" className="group text-base w-fit block">

                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Blog</span>
              </Link>
              <Link href="/contact" className="group text-base w-fit block">

                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Contact</span>
              </Link>
            </div>
          </div>

          {/* Locations Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-linear-to-br from-[#3b82f6] to-[#1d4ed8] dark:from-[#ABDCFF] dark:to-[#0396FF]">
              Locations
            </h3>
            <a href='https://www.google.com/maps/place/Fishtail+Infosolutions/@28.2211603,83.9819452,691m/data=!3m1!1e3!4m7!3m6!1s0xaf8712d0425aa3e7:0x528c4e6c8c86ffbf!4b1!8m2!3d28.2207887!4d83.9840869!16s%2Fg%2F11yq1r478s?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D' target="_blank" rel="noopener noreferrer" className="block w-fit">
              <div className="space-y-4 mt-4 w-fit">
                <div className="group cursor-pointer w-fit">
                  <span className="text-base transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:to-[#0396FF]">Pokhara 8, Bagaletole</span>
                </div>
              </div>
            </a>
          </div>

          {/* Social Media Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-linear-to-br from-[#3b82f6] to-[#1d4ed8] dark:from-[#ABDCFF] dark:to-[#0396FF]">Social Media</h3>
            <div className="flex justify-start gap-6">
              {Socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group hover:bg-white dark:bg-transparent shadow-none hover:shadow-md "
                >
                  <social.icon
                    className={cn(
                      "w-6 h-6 text-foreground/60 dark:text-white transition-colors duration-300",
                      social.groupHoverColor,
                      social.darkGroupHoverColor
                    )}
                  />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-6 mt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground/60">
          <p>© {new Date().getFullYear()} Fishtail Infosolutions. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
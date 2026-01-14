
import { Socials } from '@/constants';
import { Phone, Mail, Clock, MapPin, Home, Info, Briefcase, HelpCircle, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="mt-20 md:mt-32 bg-secondary dark:bg-background/10 backdrop-blur-md text-foreground sm:pt-24 pt-16 pb-8 w-full border-t border-border">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Contact Section */}
          <div>
            {/* <h3 className="text-lg font-semibold mb-6 text-violet-500">
              Contact
            </h3> */}
            <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] dark:from-[#ABDCFF] dark:to-[#0396FF]">
              Contact
            </h3>

            <div className="space-y-4 mt-6">
              <div className="flex items-center group">
                <div className="w-10 h-10 min-w-[2.5rem] rounded-full flex items-center justify-center mr-4 transition-colors duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm sm:text-base">+977 9806673560</span>
              </div>

              <a href="mailto:info@fishtailinfosolutions.com/" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center group cursor-pointer">
                  <div className="w-10 h-10 min-w-[2.5rem] rounded-full flex items-center justify-center mr-4 group-hover:text-blue-500 transition-colors duration-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm sm:text-base transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">info@fishtailinfosolutions.com</span>
                </div>
              </a>

              <div className="flex items-center group mt-2.5">
                <div className="w-10 h-10 min-w-[2.5rem] rounded-full flex items-center justify-center mr-4 mt-2transition-colors duration-500">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-sm sm:text-base">
                  <p>Sun to Fri: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] dark:from-[#ABDCFF] dark:to-[#0396FF]">
              Quick Links
            </h3>
            <div className="space-y-3 mt-6">
              <Link href="/company" className="flex items-center group text-sm sm:text-base">
                <Home className="w-5 h-5 min-w-[1.25rem] mr-3 group-hover:text-blue-500 transition-colors" />
                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Company</span>
              </Link>
              <Link href="/career" className="flex items-center group text-sm sm:text-base">
                <Briefcase className="w-5 h-5 min-w-[1.25rem] mr-3 group-hover:text-blue-500 transition-colors" />
                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Career</span>
              </Link>
              <Link href="/projects" className="flex items-center group text-sm sm:text-base">
                <HelpCircle className="w-5 h-5 min-w-[1.25rem] mr-3 group-hover:text-blue-500 transition-colors" />
                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Projects</span>
              </Link>
              <Link href="/blog" className="flex items-center group text-sm sm:text-base">
                <FileText className="w-5 h-5 min-w-[1.25rem] mr-3 group-hover:text-blue-500 transition-colors" />
                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Blog</span>
              </Link>
              <Link href="/contact" className="flex items-center group text-sm sm:text-base">
                <MessageSquare className="w-5 h-5 min-w-[1.25rem] mr-3 group-hover:text-blue-500 transition-colors" />
                <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Contact</span>
              </Link>
            </div>
          </div>

          {/* Locations Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] dark:from-[#ABDCFF] dark:to-[#0396FF]">
              Locations
            </h3>
            <a href='https://www.google.com/maps/place/Fishtail+Infosolutions/@28.2211603,83.9819452,691m/data=!3m1!1e3!4m7!3m6!1s0xaf8712d0425aa3e7:0x528c4e6c8c86ffbf!4b1!8m2!3d28.2207887!4d83.9840869!16s%2Fg%2F11yq1r478s?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D' target="_blank" rel="noopener noreferrer">
              <div className="space-y-4 mt-6 hover:text-violet-500">
                <div className="flex items-center group cursor-pointer"
                >
                  <div className="w-10 h-10 min-w-[2.5rem] rounded-full flex items-center justify-center mr-4 group-hover:text-blue-500 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] dark:group-hover:from-[#ABDCFF] dark:group-hover:to-[#0396FF]">Pokhara 8, Bagaletole</span>
                </div>
              </div>
            </a>
          </div>

          {/* Social Media Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] dark:from-[#ABDCFF] dark:to-[#0396FF]">Social Media</h3>
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
        {/* <div className="pt-8 text-center text-xs sm:text-sm text-muted-foreground border-t border-border/50">
          <p className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
            <span>Designed by O360® | Optimized360 LLC © 2020 All Rights Reserved</span>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gray-900 transition-colors">Legal Notices</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          </p>
        </div> */}
      </div>
    </footer>
  );
}
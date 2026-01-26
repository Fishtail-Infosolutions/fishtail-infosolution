import React from "react";
import AboutSection from "@/components/companypage/about-section";
import FAQSection from "@/components/companypage/faq-section";
import TeamMemberSection from "@/components/companypage/team-member-section";

export default function CompanyPage() {
  return (
    <div>
      <AboutSection />
      <TeamMemberSection />
      <FAQSection />
    </div>
  );
}

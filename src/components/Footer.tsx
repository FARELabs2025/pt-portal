import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#002A80] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Section - Company Info & Services */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Introduction */}
            <div>
              <p className="text-white leading-relaxed">
                A Reputed Testing, Calibration, Research, and Innovation company, helping businesses achieve quality and regulatory standards while maintaining worldwide leadership.
              </p>
            </div>

            {/* Services and Laboratories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Our Services */}
              <div>
                <h3 className="text-lg font-bold mb-4">Our Services</h3>
                <ul className="space-y-2 text-sm">
                  <li>Proficiency Testing</li>
                  <li>Calibration</li>
                  <li>Inspection / Certification (Auditing)</li>
                  <li>Other Services</li>
                </ul>
              </div>

              {/* Our Laboratories */}
              <div>
                <h3 className="text-lg font-bold mb-4">Our Laboratories</h3>
                <ul className="space-y-2 text-sm">
                  <li>UNIT 1 - L-17/3, DLF Phase-II, IFFCO Chowk, Gurgaon-122002</li>
                  <li>UNIT 2 - D-18, Infocity Phase-II, Sector-33, Gurgaon-122002</li>
                  <li>UNIT 3 - D-28, Infocity Phase-II, Sector-33, Gurgaon-122002</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section - Call Us Now Card */}
          <div className="lg:col-span-2 flex justify-end">
            <div className="bg-white rounded-lg p-6 shadow-lg border border-amber-200 max-w-sm w-full">
              <h3 className="text-xl font-bold text-black mb-4">Call Us Now!</h3>
              
              {/* Illustration placeholder - you can replace with actual image */}
              <div className="w-full h-32 bg-linear-to-r from-blue-100 to-orange-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-xs text-gray-600">Support Team</p>
                </div>
              </div>

              <h4 className="text-lg font-bold text-black mb-2">Call Now & get in touch with our team</h4>
              <p className="text-sm text-gray-600 mb-4">
                You can get a demo first and then choose a plan that meets your needs and requirements.
              </p>
              
              <Button className="w-full bg-[#002A80] hover:bg-[#002A80]/90 text-white flex items-center justify-center space-x-2 py-3">
                <Phone className="h-4 w-4" />
                <span className="font-bold">+91 9289351688</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-300 mt-8 pt-6 text-center">
          <p className="text-sm text-white">
            © Copyright FARE Labs 2025 | All rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

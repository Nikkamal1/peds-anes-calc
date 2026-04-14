import React from 'react';
const Footer = () => (
<footer className="fixed bottom-16 left-0 w-full bg-gray-200 text-center text-sm p-3">
    {/* มือถือ: แยกบรรทัด */}
    <div className="block md:hidden">
      <p>แผนกวิสัญญี โรงพยาบาลนราธิวาสราชนครินทร์</p>
      <p>โทร 061-201-2038</p>
    </div>

    {/* เดสก์ท็อป: รวมบรรทัด */}
    <p className="hidden md:block">
      แผนกวิสัญญี โรงพยาบาลนราธิวาสราชนครินทร์ โทร 061-201-2038
    </p>

    <p>© Phinit Niwatabutra</p>
  </footer>
);

export default Footer;

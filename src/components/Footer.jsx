import React from 'react';
const Footer = () => (
  <footer className="bg-gray-200 text-center text-sm p-4 mb-20">    <p>ติดต่อสอบถาม : พินิต นิวาตบุตร</p>

    {/* มือถือ: แยกบรรทัด */}
    <div className="block md:hidden">
      <p>แผนกวิสัญญี โรงพยาบาลนราธิวาสราชนครินทร์</p>
      <p>โทร 061-201-2038</p>
    </div>

    {/* เดสก์ท็อป: รวมบรรทัด */}
    <p className="hidden md:block">
      แผนกวิสัญญี โรงพยาบาลนราธิวาสราชนครินทร์ โทร  061-201-2038
    </p>

    <p>© Phinit Niwatabutra</p>
  </footer>
);

export default Footer;

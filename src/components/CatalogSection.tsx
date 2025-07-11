
import React, { useState } from 'react';
import CatalogModal from './catalog/CatalogModal';
import CatalogSectionHeader from './catalog/components/CatalogSectionHeader';
import CatalogCarouselContainer from './catalog/components/CatalogCarouselContainer';

interface CatalogImage {
  url: string;
  title: string;
}

interface Catalog {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  images: CatalogImage[];
}

const catalogsData: Catalog[] = [
  {
    id: '1',
    name: 'IMCAL',
    description: 'Criando ambientes que tocam os sentidos e emocionam.',
    coverImage: 'https://i.imgur.com/7l0H29Q.jpeg',
    images: [
      { url: 'https://i.imgur.com/X09OW6n.jpeg', title: 'Página 1' },
      { url: 'https://i.imgur.com/dNpw2Y5.jpeg', title: 'Página 2' },
      { url: 'https://i.imgur.com/fqnuiCo.jpeg', title: 'Página 3' },
      { url: 'https://i.imgur.com/l8S2wqm.jpeg', title: 'Página 4' },
      { url: 'https://i.imgur.com/dznxeDV.jpeg', title: 'Página 5' },
      { url: 'https://i.imgur.com/5ORtQJ1.jpeg', title: 'Página 6' },
      { url: 'https://i.imgur.com/dRTdRHA.jpeg', title: 'Página 7' },
      { url: 'https://i.imgur.com/4Ej7hRU.jpeg', title: 'Página 8' },
      { url: 'https://i.imgur.com/rWMfDqd.jpeg', title: 'Página 9' },
      { url: 'https://i.imgur.com/zGENPD2.jpeg', title: 'Página 10' },
      { url: 'https://i.imgur.com/fb6ZGZA.jpeg', title: 'Página 11' },
      { url: 'https://i.imgur.com/8eUJRDR.jpeg', title: 'Página 12' },
      { url: 'https://i.imgur.com/oPR2mPB.jpeg', title: 'Página 13' },
      { url: 'https://i.imgur.com/cRX6ndx.jpeg', title: 'Página 14' },
      { url: 'https://i.imgur.com/BCPdI5I.jpeg', title: 'Página 15' },
      { url: 'https://i.imgur.com/J0garDp.jpeg', title: 'Página 16' },
      { url: 'https://i.imgur.com/UWli8XE.jpeg', title: 'Página 17' },
      { url: 'https://i.imgur.com/YSwLgSY.jpeg', title: 'Página 18' },
      { url: 'https://i.imgur.com/wu3uZR1.jpeg', title: 'Página 19' },
      { url: 'https://i.imgur.com/VJK7kuG.jpeg', title: 'Página 20' },
      { url: 'https://i.imgur.com/R727cGl.jpeg', title: 'Página 21' },
      { url: 'https://i.imgur.com/RD4trM1.jpeg', title: 'Página 22' },
      { url: 'https://i.imgur.com/KyTzj4E.jpeg', title: 'Página 23' },
      { url: 'https://i.imgur.com/8XXf77i.jpeg', title: 'Página 24' },
      { url: 'https://i.imgur.com/7RLrLfQ.jpeg', title: 'Página 25' },
      { url: 'https://i.imgur.com/lCG82SV.jpeg', title: 'Página 26' },
      { url: 'https://i.imgur.com/xO7eiUs.jpeg', title: 'Página 27' },
      { url: 'https://i.imgur.com/trlXrzF.jpeg', title: 'Página 28' },
      { url: 'https://i.imgur.com/Hr83FNG.jpeg', title: 'Página 29' },
      { url: 'https://i.imgur.com/ggyA8G1.jpeg', title: 'Página 30' },
      { url: 'https://i.imgur.com/o1pCfbh.jpeg', title: 'Página 31' },
      { url: 'https://i.imgur.com/6KHtnKu.jpeg', title: 'Página 32' },
      { url: 'https://i.imgur.com/w1pgBo8.jpeg', title: 'Página 33' },
      { url: 'https://i.imgur.com/FHfJvDx.jpeg', title: 'Página 34' },
      { url: 'https://i.imgur.com/pFYWfEc.jpeg', title: 'Página 35' },
      { url: 'https://i.imgur.com/n1KBIJ3.jpeg', title: 'Página 36' },
      { url: 'https://i.imgur.com/z9yIqy6.jpeg', title: 'Página 37' },
      { url: 'https://i.imgur.com/HiPqGz6.jpeg', title: 'Página 38' },
      { url: 'https://i.imgur.com/9ZXoIVy.jpeg', title: 'Página 39' },
      { url: 'https://i.imgur.com/T6D05lV.jpeg', title: 'Página 40' },
      { url: 'https://i.imgur.com/FzwWpgr.jpeg', title: 'Página 41' },
      { url: 'https://i.imgur.com/tVtb59Y.jpeg', title: 'Página 42' },
      { url: 'https://i.imgur.com/bqkKWPI.jpeg', title: 'Página 43' },
      { url: 'https://i.imgur.com/rrE5pHu.jpeg', title: 'Página 44' },
      { url: 'https://i.imgur.com/0oQPX9q.jpeg', title: 'Página 45' },
      { url: 'https://i.imgur.com/NeKUxJD.jpeg', title: 'Página 46' },
      { url: 'https://i.imgur.com/mkrpH12.jpeg', title: 'Página 47' },
      { url: 'https://i.imgur.com/rzLlgQR.jpeg', title: 'Página 48' },
      { url: 'https://i.imgur.com/HKM5CpQ.jpeg', title: 'Página 49' },
      { url: 'https://i.imgur.com/qjXrOXF.jpeg', title: 'Página 50' },
      { url: 'https://i.imgur.com/ZfCAmAK.jpeg', title: 'Página 51' },
      { url: 'https://i.imgur.com/C9jkMF6.jpeg', title: 'Página 52' },
      { url: 'https://i.imgur.com/zzt1wct.jpeg', title: 'Página 53' },
      { url: 'https://i.imgur.com/VNMxQzU.jpeg', title: 'Página 54' },
      { url: 'https://i.imgur.com/TFX5OEa.jpeg', title: 'Página 55' },
      { url: 'https://i.imgur.com/M5JYuux.jpeg', title: 'Página 56' },
      { url: 'https://i.imgur.com/ZELlPWN.jpeg', title: 'Página 57' },
      { url: 'https://i.imgur.com/p6wIgjF.jpeg', title: 'Página 58' },
      { url: 'https://i.imgur.com/0xeqeCP.jpeg', title: 'Página 59' },
      { url: 'https://i.imgur.com/8BrAJ9J.jpeg', title: 'Página 60' },
      { url: 'https://i.imgur.com/TG0SuUg.jpeg', title: 'Página 61' },
      { url: 'https://i.imgur.com/AVfuATg.jpeg', title: 'Página 62' },
      { url: 'https://i.imgur.com/GwX0uYM.jpeg', title: 'Página 63' },
      { url: 'https://i.imgur.com/oS0KKnG.jpeg', title: 'Página 64' },
      { url: 'https://i.imgur.com/R52pdZU.jpeg', title: 'Página 65' },
      { url: 'https://i.imgur.com/g2O9edq.jpeg', title: 'Página 66' },
      { url: 'https://i.imgur.com/hcHb2J9.jpeg', title: 'Página 67' },
      { url: 'https://i.imgur.com/foRmZ8L.jpeg', title: 'Página 68' },
      { url: 'https://i.imgur.com/eKP16bI.jpeg', title: 'Página 69' },
      { url: 'https://i.imgur.com/leuXKtH.jpeg', title: 'Página 70' },
      { url: 'https://i.imgur.com/TQShmIe.jpeg', title: 'Página 71' }
    ]
  },
  {
    id: '2',
    name: 'SAMEC – Estofados',
    description: 'Excelente ergonomia, qualidade, design e grande variedade de revestimentos.',
    coverImage: 'https://i.imgur.com/GpqwuEM.png',
    images: [
      { url: 'https://i.imgur.com/KmM3FUd.jpeg', title: 'Página 1' },
      { url: 'https://i.imgur.com/bA9dhLm.jpeg', title: 'Página 2' },
      { url: 'https://i.imgur.com/C6un8O7.jpeg', title: 'Página 3' },
      { url: 'https://i.imgur.com/B5P8CTe.jpeg', title: 'Página 4' },
      { url: 'https://i.imgur.com/ht3z1sj.jpeg', title: 'Página 5' },
      { url: 'https://i.imgur.com/rLtXIsf.jpeg', title: 'Página 6' },
      { url: 'https://i.imgur.com/zT3javQ.jpeg', title: 'Página 7' },
      { url: 'https://i.imgur.com/BhflkVe.jpeg', title: 'Página 8' },
      { url: 'https://i.imgur.com/tEkaV3H.jpeg', title: 'Página 9' },
      { url: 'https://i.imgur.com/XrpgGPa.jpeg', title: 'Página 10' },
      { url: 'https://i.imgur.com/LbEh54q.jpeg', title: 'Página 11' },
      { url: 'https://i.imgur.com/jvKsepg.jpeg', title: 'Página 12' },
      { url: 'https://i.imgur.com/oAV89py.jpeg', title: 'Página 13' },
      { url: 'https://i.imgur.com/IoTHUk3.jpeg', title: 'Página 14' },
      { url: 'https://i.imgur.com/reL1fat.jpeg', title: 'Página 15' },
      { url: 'https://i.imgur.com/XhMDFqh.jpeg', title: 'Página 16' },
      { url: 'https://i.imgur.com/tJUcsyH.jpeg', title: 'Página 17' },
      { url: 'https://i.imgur.com/BHQbd4n.jpeg', title: 'Página 18' },
      { url: 'https://i.imgur.com/VCgOJxf.jpeg', title: 'Página 19' },
      { url: 'https://i.imgur.com/QmvZJPY.jpeg', title: 'Página 20' },
      { url: 'https://i.imgur.com/F5wDJS3.jpeg', title: 'Página 21' },
      { url: 'https://i.imgur.com/ffp86qz.jpeg', title: 'Página 22' },
      { url: 'https://i.imgur.com/YcGLGCI.jpeg', title: 'Página 23' },
      { url: 'https://i.imgur.com/8Y1kg3o.jpeg', title: 'Página 24' },
      { url: 'https://i.imgur.com/TGG3og1.jpeg', title: 'Página 25' },
      { url: 'https://i.imgur.com/AH0YvvC.jpeg', title: 'Página 26' },
      { url: 'https://i.imgur.com/fbDjFt7.jpeg', title: 'Página 27' },
      { url: 'https://i.imgur.com/FwHGYJe.jpeg', title: 'Página 28' },
      { url: 'https://i.imgur.com/H9ujCSD.jpeg', title: 'Página 29' },
      { url: 'https://i.imgur.com/dVMaBsy.jpeg', title: 'Página 30' },
      { url: 'https://i.imgur.com/u2r0O3R.jpeg', title: 'Página 31' },
      { url: 'https://i.imgur.com/uL4Wbt5.jpeg', title: 'Página 32' },
      { url: 'https://i.imgur.com/WpeZcwo.jpeg', title: 'Página 33' },
      { url: 'https://i.imgur.com/u5A4Jfh.jpeg', title: 'Página 34' },
      { url: 'https://i.imgur.com/rDWiGSu.jpeg', title: 'Página 35' },
      { url: 'https://i.imgur.com/ELOFzCV.jpeg', title: 'Página 36' },
      { url: 'https://i.imgur.com/iWHBBF4.jpeg', title: 'Página 37' },
      { url: 'https://i.imgur.com/LzvF4qL.jpeg', title: 'Página 38' },
      { url: 'https://i.imgur.com/x9CsdPV.jpeg', title: 'Página 39' },
      { url: 'https://i.imgur.com/NCI0Ci9.jpeg', title: 'Página 40' },
      { url: 'https://i.imgur.com/kxWsNuF.jpeg', title: 'Página 41' },
      { url: 'https://i.imgur.com/d61QSGD.jpeg', title: 'Página 42' },
      { url: 'https://i.imgur.com/SmEsNCE.jpeg', title: 'Página 43' },
      { url: 'https://i.imgur.com/jquCSXv.jpeg', title: 'Página 44' },
      { url: 'https://i.imgur.com/4k9SLEz.jpeg', title: 'Página 45' },
      { url: 'https://i.imgur.com/vwQiAyv.jpeg', title: 'Página 46' },
      { url: 'https://i.imgur.com/MfimbCQ.jpeg', title: 'Página 47' },
      { url: 'https://i.imgur.com/stEqYCg.jpeg', title: 'Página 48' },
      { url: 'https://i.imgur.com/SvmsuEV.jpeg', title: 'Página 49' },
      { url: 'https://i.imgur.com/ROlX183.jpeg', title: 'Página 50' },
      { url: 'https://i.imgur.com/xKn9KPS.jpeg', title: 'Página 51' },
      { url: 'https://i.imgur.com/sXkpMQ6.jpeg', title: 'Página 52' },
      { url: 'https://i.imgur.com/RaHLq8D.jpeg', title: 'Página 53' },
      { url: 'https://i.imgur.com/zEesktS.jpeg', title: 'Página 54' },
      { url: 'https://i.imgur.com/sPr87G8.jpeg', title: 'Página 55' },
      { url: 'https://i.imgur.com/JkCDrHF.jpeg', title: 'Página 56' },
      { url: 'https://i.imgur.com/vQPbm6q.jpeg', title: 'Página 57' },
      { url: 'https://i.imgur.com/zGj93YJ.jpeg', title: 'Página 58' },
      { url: 'https://i.imgur.com/fGTQkHs.jpeg', title: 'Página 59' },
      { url: 'https://i.imgur.com/9PUVsIH.jpeg', title: 'Página 60' },
      { url: 'https://i.imgur.com/94Q5c0H.jpeg', title: 'Página 61' },
      { url: 'https://i.imgur.com/nRdGgOk.jpeg', title: 'Página 62' },
      { url: 'https://i.imgur.com/gN3to7Q.jpeg', title: 'Página 63' },
      { url: 'https://i.imgur.com/3QvE60R.jpeg', title: 'Página 64' },
      { url: 'https://i.imgur.com/VJP5AD0.jpeg', title: 'Página 65' },
      { url: 'https://i.imgur.com/8ckCBz2.jpeg', title: 'Página 66' },
      { url: 'https://i.imgur.com/MBBaLiu.jpeg', title: 'Página 67' },
      { url: 'https://i.imgur.com/1ynDt33.jpeg', title: 'Página 68' },
      { url: 'https://i.imgur.com/iyfxqrh.jpeg', title: 'Página 69' },
      { url: 'https://i.imgur.com/0SNPAE9.jpeg', title: 'Página 70' },
      { url: 'https://i.imgur.com/YNul91f.jpeg', title: 'Página 71' },
      { url: 'https://i.imgur.com/lfo3ZY4.jpeg', title: 'Página 72' },
      { url: 'https://i.imgur.com/WP6Ocio.jpeg', title: 'Página 73' },
      { url: 'https://i.imgur.com/nDyECDS.jpeg', title: 'Página 74' },
      { url: 'https://i.imgur.com/UC2QiZ0.jpeg', title: 'Página 75' },
      { url: 'https://i.imgur.com/qYvHamY.jpeg', title: 'Página 76' },
      { url: 'https://i.imgur.com/aOR25SK.jpeg', title: 'Página 77' },
      { url: 'https://i.imgur.com/70laq6k.jpeg', title: 'Página 78' },
      { url: 'https://i.imgur.com/GwRLahz.jpeg', title: 'Página 79' },
      { url: 'https://i.imgur.com/aYM1Upn.jpeg', title: 'Página 80' },
      { url: 'https://i.imgur.com/htVDgiK.jpeg', title: 'Página 81' },
      { url: 'https://i.imgur.com/kOYcj4C.jpeg', title: 'Página 82' },
      { url: 'https://i.imgur.com/C0kv6aN.jpeg', title: 'Página 83' },
      { url: 'https://i.imgur.com/swtw7mp.jpeg', title: 'Página 84' },
      { url: 'https://i.imgur.com/BGtBGf5.jpeg', title: 'Página 85' },
      { url: 'https://i.imgur.com/0MAJO2A.jpeg', title: 'Página 86' },
      { url: 'https://i.imgur.com/Gc0VpjZ.jpeg', title: 'Página 87' },
      { url: 'https://i.imgur.com/Wj5KDbH.jpeg', title: 'Página 88' },
      { url: 'https://i.imgur.com/ebaFux6.jpeg', title: 'Página 89' },
      { url: 'https://i.imgur.com/KelLGQS.jpeg', title: 'Página 90' },
      { url: 'https://i.imgur.com/bOIjJ2S.jpeg', title: 'Página 91' },
      { url: 'https://i.imgur.com/NbIupa4.jpeg', title: 'Página 92' },
      { url: 'https://i.imgur.com/CyDNiBW.jpeg', title: 'Página 93' },
      { url: 'https://i.imgur.com/qhvtp6P.jpeg', title: 'Página 94' },
      { url: 'https://i.imgur.com/8M3neAY.jpeg', title: 'Página 95' },
      { url: 'https://i.imgur.com/q3lxL5m.jpeg', title: 'Página 96' },
      { url: 'https://i.imgur.com/wGolL45.jpeg', title: 'Página 97' },
      { url: 'https://i.imgur.com/7VGWLnX.jpeg', title: 'Página 98' },
      { url: 'https://i.imgur.com/m4bMoYx.jpeg', title: 'Página 99' },
      { url: 'https://i.imgur.com/f5ffSId.jpeg', title: 'Página 100' },
      { url: 'https://i.imgur.com/3EOiYLj.jpeg', title: 'Página 101' },
      { url: 'https://i.imgur.com/DQAKsY4.jpeg', title: 'Página 102' },
      { url: 'https://i.imgur.com/DAy1ut4.jpeg', title: 'Página 103' },
      { url: 'https://i.imgur.com/HbkuOHT.jpeg', title: 'Página 104' },
      { url: 'https://i.imgur.com/YiPj3TN.jpeg', title: 'Página 105' },
      { url: 'https://i.imgur.com/cmttiBR.jpeg', title: 'Página 106' },
      { url: 'https://i.imgur.com/NdNgDEJ.jpeg', title: 'Página 107' },
      { url: 'https://i.imgur.com/AnAGU5B.jpeg', title: 'Página 108' },
      { url: 'https://i.imgur.com/Ybm9V8o.jpeg', title: 'Página 109' },
      { url: 'https://i.imgur.com/ubBoXBY.jpeg', title: 'Página 110' },
      { url: 'https://i.imgur.com/k0OchZG.jpeg', title: 'Página 111' },
      { url: 'https://i.imgur.com/PVrCC2U.jpeg', title: 'Página 112' },
      { url: 'https://i.imgur.com/4G7rVb5.jpeg', title: 'Página 113' },
      { url: 'https://i.imgur.com/xBw5GVT.jpeg', title: 'Página 114' },
      { url: 'https://i.imgur.com/oTtnYmX.jpeg', title: 'Página 115' },
      { url: 'https://i.imgur.com/5LSoF7L.jpeg', title: 'Página 116' },
      { url: 'https://i.imgur.com/u80kihp.jpeg', title: 'Página 117' },
      { url: 'https://i.imgur.com/qC8WdO1.jpeg', title: 'Página 118' },
      { url: 'https://i.imgur.com/d5VFwSY.jpeg', title: 'Página 119' },
      { url: 'https://i.imgur.com/yLlpV63.jpeg', title: 'Página 120' },
      { url: 'https://i.imgur.com/MmZA69B.jpeg', title: 'Página 121' },
      { url: 'https://i.imgur.com/ZacaVrC.jpeg', title: 'Página 122' },
      { url: 'https://i.imgur.com/xHTEdRE.jpeg', title: 'Página 123' },
      { url: 'https://i.imgur.com/fEgSzZ2.jpeg', title: 'Página 124' },
      { url: 'https://i.imgur.com/LFtCSRI.jpeg', title: 'Página 125' },
      { url: 'https://i.imgur.com/weXy4EC.jpeg', title: 'Página 126' },
      { url: 'https://i.imgur.com/NX0BWE6.jpeg', title: 'Página 127' },
      { url: 'https://i.imgur.com/oBkrlbB.jpeg', title: 'Página 128' },
      { url: 'https://i.imgur.com/oSzDtlM.jpeg', title: 'Página 129' },
      { url: 'https://i.imgur.com/ydR3tyW.jpeg', title: 'Página 130' },
      { url: 'https://i.imgur.com/qhyqkgf.jpeg', title: 'Página 131' },
      { url: 'https://i.imgur.com/OoSMZem.jpeg', title: 'Página 132' },
      { url: 'https://i.imgur.com/3biVlZ4.jpeg', title: 'Página 133' },
      { url: 'https://i.imgur.com/IyIFLCN.jpeg', title: 'Página 134' },
      { url: 'https://i.imgur.com/W0SvHPD.jpeg', title: 'Página 135' },
      { url: 'https://i.imgur.com/1cn7rog.jpeg', title: 'Página 136' },
      { url: 'https://i.imgur.com/sd6zdof.jpeg', title: 'Página 137' },
      { url: 'https://i.imgur.com/Z23HKPC.jpeg', title: 'Página 138' },
      { url: 'https://i.imgur.com/sOIIeWU.jpeg', title: 'Página 139' },
      { url: 'https://i.imgur.com/oXwm2em.jpeg', title: 'Página 140' },
      { url: 'https://i.imgur.com/9rlMlFv.jpeg', title: 'Página 141' },
      { url: 'https://i.imgur.com/iQFWUMB.jpeg', title: 'Página 142' },
      { url: 'https://i.imgur.com/pDFSjy7.jpeg', title: 'Página 143' },
      { url: 'https://i.imgur.com/A8WzXs8.jpeg', title: 'Página 144' },
      { url: 'https://i.imgur.com/5X2qPiy.jpeg', title: 'Página 145' },
      { url: 'https://i.imgur.com/IvnFxr5.jpeg', title: 'Página 146' },
      { url: 'https://i.imgur.com/cAeZ61X.jpeg', title: 'Página 147' },
      { url: 'https://i.imgur.com/53HAMwV.jpeg', title: 'Página 148' },
      { url: 'https://i.imgur.com/LeA1Z7S.jpeg', title: 'Página 149' },
      { url: 'https://i.imgur.com/On8xTZt.jpeg', title: 'Página 150' },
      { url: 'https://i.imgur.com/vCXot19.jpeg', title: 'Página 151' },
      { url: 'https://i.imgur.com/3VBIkKu.jpeg', title: 'Página 152' },
      { url: 'https://i.imgur.com/fIH7foE.jpeg', title: 'Página 153' },
      { url: 'https://i.imgur.com/nzRoNhP.jpeg', title: 'Página 154' },
      { url: 'https://i.imgur.com/EmwnurQ.jpeg', title: 'Página 155' },
      { url: 'https://i.imgur.com/jVMMuJH.jpeg', title: 'Página 156' },
      { url: 'https://i.imgur.com/wxiUrOL.jpeg', title: 'Página 157' },
      { url: 'https://i.imgur.com/7HSwi4j.jpeg', title: 'Página 158' },
      { url: 'https://i.imgur.com/B0kAnNb.jpeg', title: 'Página 159' },
      { url: 'https://i.imgur.com/zQ5fphA.jpeg', title: 'Página 160' },
      { url: 'https://i.imgur.com/I8a68hQ.jpeg', title: 'Página 161' },
      { url: 'https://i.imgur.com/vbA69FG.jpeg', title: 'Página 162' },
      { url: 'https://i.imgur.com/CGtzeJK.jpeg', title: 'Página 163' },
      { url: 'https://i.imgur.com/MiA7T4Q.jpeg', title: 'Página 164' }
    ]
  },
  {
    id: '3',
    name: 'King Konfort',
    description: 'Excelente ergonomia, qualidade, design e grande variedade de revestimentos.',
    coverImage: 'https://i.imgur.com/cGScdPw.png',
    images: [
      { url: 'https://i.imgur.com/UF57xsj.png', title: 'Página 1' },
      { url: 'https://i.imgur.com/q3MqMeV.png', title: 'Página 2' },
      { url: 'https://i.imgur.com/mfvGI3P.png', title: 'Página 3' },
      { url: 'https://i.imgur.com/5hsqhvE.jpeg', title: 'Página 4' },
      { url: 'https://i.imgur.com/hnZYjaW.png', title: 'Página 5' },
      { url: 'https://i.imgur.com/1l2yiwj.png', title: 'Página 6' },
      { url: 'https://i.imgur.com/faDHAI8.png', title: 'Página 7' },
      { url: 'https://i.imgur.com/7vLplkk.png', title: 'Página 8' },
      { url: 'https://i.imgur.com/cprFFbE.jpeg', title: 'Página 9' },
      { url: 'https://i.imgur.com/KmgUPuU.png', title: 'Página 10' },
      { url: 'https://i.imgur.com/52e2KQf.jpeg', title: 'Página 11' },
      { url: 'https://i.imgur.com/pZaE47i.png', title: 'Página 12' },
      { url: 'https://i.imgur.com/NRSjy39.png', title: 'Página 13' },
      { url: 'https://i.imgur.com/yCWQeQ9.png', title: 'Página 14' },
      { url: 'https://i.imgur.com/oduZNJx.jpeg', title: 'Página 15' },
      { url: 'https://i.imgur.com/B7CKmNY.jpeg', title: 'Página 16' },
      { url: 'https://i.imgur.com/n5kjDOz.jpeg', title: 'Página 17' },
      { url: 'https://i.imgur.com/QUsnlz2.png', title: 'Página 18' },
      { url: 'https://i.imgur.com/l2w9138.png', title: 'Página 19' },
      { url: 'https://i.imgur.com/8Dv2wHA.png', title: 'Página 20' },
      { url: 'https://i.imgur.com/DccWxxY.jpeg', title: 'Página 21' },
      { url: 'https://i.imgur.com/17pvzkY.png', title: 'Página 22' },
      { url: 'https://i.imgur.com/fR9DO1l.png', title: 'Página 23' },
      { url: 'https://i.imgur.com/MFVb8jZ.png', title: 'Página 24' },
      { url: 'https://i.imgur.com/VWnAqQr.png', title: 'Página 25' },
      { url: 'https://i.imgur.com/t8Rsbmv.png', title: 'Página 26' },
      { url: 'https://i.imgur.com/goloRSr.png', title: 'Página 27' },
      { url: 'https://i.imgur.com/yrnC3CP.png', title: 'Página 28' },
      { url: 'https://i.imgur.com/YnqpPAA.png', title: 'Página 29' }
    ]
  }
];

const CatalogSection: React.FC = () => {
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCatalogClick = (catalog: Catalog) => {
    setSelectedCatalog(catalog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCatalog(null);
  };

  return (
    <>
      <section id="catalogs" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <CatalogSectionHeader title="Catálogos" />
          <CatalogCarouselContainer
            catalogs={catalogsData}
            onCatalogClick={handleCatalogClick}
          />
        </div>
      </section>

      <CatalogModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        catalog={selectedCatalog}
      />
    </>
  );
};

export default CatalogSection;

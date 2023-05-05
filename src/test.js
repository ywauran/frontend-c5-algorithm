import React from "react";
// import { dataPelatihan, atribut } from "./utils/data";

// Contoh data pelatihan
const dataPelatihan = [
  { umur: "muda", pendapatan: "rendah", mahasiswa: true, kelas: "tidak_lulus" },
  { umur: "muda", pendapatan: "rendah", mahasiswa: false, kelas: "lulus" },
  { umur: "muda", pendapatan: "tinggi", mahasiswa: true, kelas: "lulus" },
  {
    umur: "dewasa",
    pendapatan: "rendah",
    mahasiswa: false,
    kelas: "tidak_lulus",
  },
  { umur: "dewasa", pendapatan: "tinggi", mahasiswa: true, kelas: "lulus" },
  { umur: "tua", pendapatan: "rendah", mahasiswa: false, kelas: "lulus" },
  { umur: "tua", pendapatan: "tinggi", mahasiswa: true, kelas: "tidak_lulus" },
];

// Fungsi untuk menghitung entropi
function hitungEntropi(data) {
  const jumlahData = data.length;
  const kelasCount = {};
  for (let i = 0; i < jumlahData; i++) {
    const kelas = data[i].kelas;
    if (kelasCount[kelas]) {
      kelasCount[kelas]++;
    } else {
      kelasCount[kelas] = 1;
    }
  }
  let entropi = 0;
  for (let kelas in kelasCount) {
    const proporsiKelas = kelasCount[kelas] / jumlahData;
    entropi -= proporsiKelas * Math.log2(proporsiKelas);
  }
  return entropi;
}

// Fungsi untuk membagi data berdasarkan atribut
function bagiData(data, atribut, nilaiAtribut) {
  return data.filter((row) => row[atribut] === nilaiAtribut);
}

// Fungsi untuk memilih atribut terbaik
function pilihAtributTerbaik(data, atribut) {
  let entropiAwal = hitungEntropi(data);
  let gainTerbaik = -Infinity;
  let atributTerbaik;
  for (let i = 0; i < atribut.length; i++) {
    const nilaiAtribut = new Set(data.map((row) => row[atribut[i]]));
    let gain = entropiAwal;
    for (let nilai of nilaiAtribut) {
      const dataBagi = bagiData(data, atribut[i], nilai);
      const proporsiDataBagi = dataBagi.length / data.length;
      gain -= proporsiDataBagi * hitungEntropi(dataBagi);
    }
    if (gain > gainTerbaik) {
      gainTerbaik = gain;
      atributTerbaik = atribut[i];
    }
  }
  return atributTerbaik;
}

function bangunPohonKeputusan(data, atribut) {
  // Base case: jika semua data memiliki kelas yang sama, maka return kelas tersebut
  const kelasUnik = new Set(data.map((row) => row.kelas));
  if (kelasUnik.size === 1) {
    return {
      atribut: null,
      nilaiAtribut: null,
      kelas: kelasUnik.values().next().value,
      anak: null,
    };
  }

  // Base case: jika atribut kosong atau data tidak memiliki variasi atribut, maka return kelas mayoritas
  if (
    atribut.length === 0 ||
    !data.some((row) => atribut.includes(row.atribut))
  ) {
    const kelasMayoritas = hitungKelasMayoritas(data);
    return {
      atribut: null,
      nilaiAtribut: null,
      kelas: kelasMayoritas,
      anak: null,
    };
  }

  // Memilih atribut terbaik untuk split
  const atributTerbaik = pilihAtributTerbaik(data, atribut);

  // Membangun pohon keputusan rekursif untuk setiap nilai atribut terbaik
  const anak = {};
  atributTerbaik.nilaiAtribut.forEach((nilai) => {
    const dataAnak = data.filter(
      (row) => row[atributTerbaik.atribut] === nilai
    );
    anak[nilai] = bangunPohonKeputusan(
      dataAnak,
      atribut.filter((a) => a !== atributTerbaik.atribut)
    );
  });

  return {
    atribut: atributTerbaik.atribut,
    nilaiAtribut: atributTerbaik.nilaiAtribut,
    kelas: null,
    anak: anak,
  };
}

// Fungsi untuk menghitung kelas mayoritas
function hitungKelasMayoritas(data) {
  // Membuat objek untuk menghitung jumlah kemunculan kelas
  const kelasCounter = {};

  // Menghitung jumlah kemunculan setiap kelas dalam data
  data.forEach((row) => {
    if (kelasCounter[row.kelas]) {
      kelasCounter[row.kelas]++;
    } else {
      kelasCounter[row.kelas] = 1;
    }
  });

  // Mencari kelas dengan jumlah kemunculan terbanyak
  let kelasMayoritas = null;
  let maxCount = 0;
  for (const kelas in kelasCounter) {
    if (kelasCounter[kelas] > maxCount) {
      maxCount = kelasCounter[kelas];
      kelasMayoritas = kelas;
    }
  }

  return kelasMayoritas;
}

// // Fungsi untuk memilih atribut terbaik
// function pilihAtributTerbaik(data, atribut) {
//   // Membuat objek untuk menghitung gain dari setiap atribut
//   const gainAtribut = {};

//   // Menghitung entropy untuk data awal
//   const entropyAwal = hitungEntropy(data);

//   // Menghitung gain untuk setiap atribut
//   atribut.forEach((atributItem) => {
//     // Menghitung entropy untuk setiap nilai atribut
//     const nilaiAtributUnik = new Set(data.map((row) => row[atributItem]));
//     let entropyAtribut = 0;
//     nilaiAtributUnik.forEach((nilai) => {
//       const dataNilaiAtribut = data.filter((row) => row[atributItem] === nilai);
//       const proporsiNilaiAtribut = dataNilaiAtribut.length / data.length;
//       entropyAtribut += proporsiNilaiAtribut * hitungEntropy(dataNilaiAtribut);
//     });

//     // Menghitung gain untuk atribut saat ini
//     gainAtribut[atributItem] = entropyAwal - entropyAtribut;
//   });

//   // Mencari atribut dengan gain tertinggi
//   let atributTerbaik = null;
//   let maxGain = -Infinity;
//   for (const atributItem in gainAtribut) {
//     if (gainAtribut[atributItem] > maxGain) {
//       maxGain = gainAtribut[atributItem];
//       atributTerbaik = atributItem;
//     }
//   }

//   // Mengambil nilai unik dari atribut terbaik
//   const nilaiAtributUnik = new Set(data.map((row) => row[atributTerbaik]));

//   return {
//     atribut: atributTerbaik,
//     nilaiAtribut: Array.from(nilaiAtributUnik),
//   };
// }

const App = ({ dataPelatihan, atribut }) => {
  // Memanggil fungsi bangunPohonKeputusan untuk membangun pohon keputusan
  const pohonKeputusan = bangunPohonKeputusan(dataPelatihan, atribut);

  return (
    <div>
      {/* Tampilan hasil per fungsi */}
      <h1>Hasil Per Fungsi</h1>
      <ul>
        <li>
          <h2>Entropi:</h2>
          <pre>{JSON.stringify(hitungEntropi(dataPelatihan), null, 2)}</pre>
        </li>
        <li>
          <h2>Pembagian Data:</h2>
          <pre>
            {JSON.stringify(
              bagiData(dataPelatihan, atribut, "nilaiAtribut"),
              null,
              2
            )}
          </pre>
        </li>
        <li>
          <h2>Atribut Terbaik:</h2>
          <pre>
            {JSON.stringify(
              pilihAtributTerbaik(dataPelatihan, atribut),
              null,
              2
            )}
          </pre>
        </li>
      </ul>
      {/* Tampilan hasil pohon keputusan */}
      <h1>Pohon Keputusan</h1>
      {/* Implementasi tampilan pohon keputusan */}
      <pre>{JSON.stringify(pohonKeputusan, null, 2)}</pre>
    </div>
  );
};

export default App;

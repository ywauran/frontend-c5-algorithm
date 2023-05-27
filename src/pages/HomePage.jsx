import React from "react";
import Algorithm from "../assets/algorithm.jpg";

const HomePage = () => {
  return (
    <>
      <div className="flex space-x-4">
        <div>
          <h1 className="font-bold">Kategori Tingkat Kesejahteraan</h1>
          <p>
            Tingkat Kesejahteraan KeluargaTingkat kesejahteraan keluarga menurut
            Badan Koordinasi Keluarga Berencana Nasional (BKKBN) dikelompokkan
            menjadi 5 (lima) tahapan, yaitu:
          </p>
          <ol className="flex flex-col space-y-4">
            <li>
              1. Tahapan Keluarga Pra Sejahtera (KPS) <br /> Keluarga Pra
              Sejahtera yaitu keluarga yang tidak memenuhi salah satu dari 6
              (enam) indikator Keluarga Sejahtera I (KS I) atau indikator
              ”kebutuhan dasar keluarga” (basic needs).
            </li>
            <li>
              2. Tahapan Keluarga Sejahtera I (KS-I) <br /> Keluarga Sejahtera I
              yaitu keluarga mampu memenuhi 6 (enam) indikator tahapan KS I,
              tetapi tidak memenuhi salah satu dari 8 (delapan) indikator
              Keluarga Sejahtera II atau indikator ”kebutuhan psikologis”
              (psychological needs) keluarga.
            </li>
            <li>
              3. Tahapan Keluarga Sejahtera II (KS-II) <br /> Keluarga Sejahtera
              II yaitu keluarga yang mampu memenuhi 6 (enam) indikator tahapan
              KS I dan 8 (delapan) indikator KS II, tetapi tidak memenuhi salah
              satu dari 5 (lima) indikator Keluarga Sejahtera III (KS III), atau
              indikator ”kebutuhan pengembangan” (develomental needs) dari
              keluarga.
            </li>
            <li>
              4. Tahapan Keluarga Sejahtera III (KS-III) <br /> Keluarga
              Sejahtera III yaitu keluarga yang mampu memenuhi 6 (enam)
              indikator tahapan KS I, 8 (delapan) indikator KS II, dan 5 (lima)
              indikator KS III, tetapi tidak memenuhi salah satu dari 2 (dua)
              indikator Keluarga Sejahtera III Plus (KS III Plus) atau indikator
              ”aktualisasi diri” (self esteem) keluarga.
            </li>
            <li>
              5. Tahapan Keluarga Sejahtera III Plus (KS-III Plus) <br />{" "}
              Keluarga Sejahtera III Plus yaitu keluarga yang mampu memenuhi
              keseluruhan dari 6 (enam) indikator tahapan KS I, 8 (delapan)
              indikator KS II, 5 (lima) indikator KS III, serta 2 (dua)
              indikator tahapan KS III Plus.
            </li>
          </ol>
        </div>

        <img src={Algorithm} alt="" className="w-[500px] h-[300px]" />
      </div>
    </>
  );
};

export default HomePage;

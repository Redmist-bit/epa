<template>
  <v-card>
    <v-btn color="success" @click="print">
      <v-icon>mdi-printer</v-icon>
    </v-btn>
    <v-container class="fill-height" fluid>
      <v-sheet
        outlined
        width="21cm"
        height="auto"
        class="ma-8 mx-auto elevation-15"
      >
        <div
          id="printing"
          style="padding: 15px; width: 21cm; height: auto; margin: auto"
        >
          <!-- <img src="./img/BluePrintCar.png" alt="rangka"> -->
          <img
            style="width: 250px"
            class="logo"
            src="../../../assets/TA_Logo1.png"
            alt="logo"
          />
          <h4 style="text-align: center; font-size:15px font-family: calibri;">
            {{ dataReport.AlamatLengkap }}
          </h4>
          <h4 style="text-align: center; font-size:15px font-family: calibri;">
            {{ dataReport.EmailPerusahaan }}
          </h4>
          <h3>WORK ORDER : {{ dataReport.KodeNota }}</h3>

          <table
            style="
              border: 1px solid black;
              border-collapse: collapse;
              width: 100%;
            "
          >
            <tr>
              <td class="judul" style="width: 20%">DATA KENDARAAN</td>
              <td style="width: 30%">&nbsp;</td>
              <td class="judul" style="width: 20%; text-decoration: underline">
                DATA PELANGGAN
              </td>
              <td style="width: 30%">&nbsp;</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Merk/Type</td>
              <td class="isi" style="width: 30%">
                : {{ dataReport.MerkType }}
              </td>
              <td class="judul" style="width: 20%">Nama</td>
              <td class="isi" style="width: 30%">: {{ dataReport.Pemilik }}</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Tahun</td>
              <td class="isi" style="width: 30%">: {{ dataReport.Tahun }}</td>
              <td class="judul" style="width: 20%">Alamat</td>
              <td class="isi" style="width: 30%">
                : {{ dataReport.AlamatPemilik }}.
              </td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">No Polisi</td>
              <td class="isi" style="width: 30%">
                : {{ dataReport.NomorPolisi }}
              </td>
              <td class="judul" style="width: 20%">Nomor Telepon</td>
              <td class="isi" style="width: 30%">: {{ dataReport.Telp }}</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">No Rangka</td>
              <td class="isi" style="width: 30%">
                : {{ dataReport.NomorRangka }}
              </td>
              <td class="judul" style="width: 20%">Keterangan</td>
              <td style="width: 30%">:</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">No Mesin</td>
              <td class="isi" style="width: 30%">
                : {{ dataReport.NomorMesin }}
              </td>
              <td class="judul" style="width: 20%">S/A</td>
              <td style="width: 30%">:</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Warna</td>
              <td class="isi" style="width: 30%">: {{ dataReport.Warna }}</td>
              <td class="judul" style="width: 20%">Mekanik</td>
              <td style="width: 30%">:</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Biaya (Est)</td>
              <td style="width: 30%">:</td>
              <td class="judul" style="width: 20%">Tanggal</td>
              <td class="isi" style="width: 30%">: {{ dataReport.Tanggal }}</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">Odometer</td>
              <td class="isi" style="width: 30%">
                : {{ dataReport.Odometer }}
              </td>
              <td class="judul" style="width: 20%">jam</td>
              <td style="width: 30%">:</td>
            </tr>
            <tr>
              <td class="judul" style="width: 20%">BBM</td>
              <td style="width: 30%">: F |------|------|------|------| E</td>
              <td class="judul" style="width: 20%">Asuransi</td>
              <td class="isi" style="width: 30%">
                : {{ dataReport.Pelanggan }}
              </td>
            </tr>
          </table>
          <!-- table isi -->
          <div class="page">
            <table
              style="
                margin-top: 10px;
                border: 1px solid black;
                border-collapse: collapse;
                width: 100%;
                height: auto;
              "
            >
              <tr
                class="judul"
                style="
                  font-size: 15px;
                  border-top: 2px solid black;
                  border-bottom: 1px solid black;
                "
              >
                <td>Keluhan</td>
              </tr>
              <!-- <tr>
                                <td>-</td>
                            </tr> -->
              <tr
                v-for="(item, index) in dataReport.Keluhan"
                :key="index"
                style="border-bottom: 1px solid black"
              >
                <td>{{ item.Keluhan }}</td>
              </tr>
            </table>
            <table style="width: 100%; margin-top: 15px">
              <tfoot>
                <!-- kotak perlengkapan  -->
                <tr>
                  <div class="perlengkapan" style="display: flex">
                    <td width="34%" style="font-size: 12px">
                      <table
                        width="100%"
                        style="
                          border: 1px solid black;
                          border-collapse: collapse;
                        "
                      >
                        <thead>
                          <tr>
                            <th style="border: 1px solid black" rowspan="2">
                              No
                            </th>
                            <th
                              style="border: 1px solid black"
                              rowspan="2"
                              colspan="2"
                            >
                              Perlengkapan / Akses
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in perlengkapan"
                            :key="index"
                          >
                            <td style="border: 1px solid black">
                              {{ index + 1 }}
                            </td>
                            <td style="border: 1px solid black">
                              {{ item.Akses }}
                            </td>
                            <td style="border: 1px solid black" class="cek">
                              {{ item.Cek }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td width="34%" style="font-size: 12px">
                      <table
                        width="100%"
                        style="
                          border: 1px solid black;
                          border-collapse: collapse;
                        "
                      >
                        <thead>
                          <tr>
                            <th style="border: 1px solid black" rowspan="2">
                              No
                            </th>
                            <th
                              style="border: 1px solid black"
                              rowspan="2"
                              colspan="2"
                            >
                              Perlengkapan / Akses
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in perlengkapan2"
                            :key="index"
                          >
                            <td style="border: 1px solid black">
                              {{ index + 22 }}
                            </td>
                            <td style="border: 1px solid black">
                              {{ item.Akses }}
                            </td>
                            <td style="border: 1px solid black" class="cek">
                              {{ item.Cek }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td width="auto">
                      <table style="border: 1px solid black">
                        <tbody>
                          <td>
                            <tr>
                              <td>
                                <img
                                  class="car"
                                  :src="
                                    require('../../../assets/gambar_mobil.png')
                                  "
                                />
                              </td>
                            </tr>
                          </td>
                        </tbody>
                      </table>
                    </td>
                  </div>
                </tr>
                <!-- Kotak keterangan  -->
                <tr>
                  <table
                    style="
                      margin-top: 10px;
                      border: 1px solid black;
                      border-collapse: collapse;
                      width: 100%;
                    "
                  >
                    <tr>
                      <td>
                        1. Work Order ASLI wajib dibawa saat pengambilan
                        kendaraan.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        2. Segala Pembayaran harus sudah lunas saat kendaraan
                        diambil.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        3. Kami tidak dapat bertanggungjawab atas segala
                        kerusakan kendaraan yang terjadi akibat Force Majeure.
                      </td>
                    </tr>
                  </table>
                </tr>
                <!-- Kotak TTD -->
                <tr>
                  <table
                    style="
                      width: 60%;
                      float: left;
                      margin-top: 20px;
                      margin-bottom: 10px;
                      border: 1px solid black;
                      border-collapse: collapse;
                    "
                  >
                    <!-- <thead>
                                        </thead> -->
                    <tbody>
                      <tr>
                        <th style="border-bottom: 2px solid black" colspan="2">
                          Petugas Bengkel
                        </th>
                      </tr>
                      <tr>
                        <th style="width: 50%; border: 1px solid black">
                          Service Advisor
                        </th>
                        <th style="width: 50%; border: 1px solid black">
                          Mekanik
                        </th>
                      </tr>
                      <tr>
                        <td style="height: 50px">&nbsp;</td>
                        <td style="height: 50px">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    style="
                      width: 20%;
                      float: right;
                      margin-top: 20px;
                      margin-bottom: 10px;
                      border: 1px solid black;
                      border-collapse: collapse;
                    "
                  >
                    <thead>
                      <tr>
                        <th style="border-bottom: 2px solid black">
                          Pelanggan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="height: 67px">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                </tr>
              </tfoot>
            </table>
          </div>
          <!-- <table>
                        <tbody>
                            <tr>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table> -->
        </div>
      </v-sheet>
    </v-container>
  </v-card>
</template>

<script>
import api from "@/services/http";
export default {
  data() {
    return {
      id: "",
      dataReport: {},
      token: localStorage.getItem("token"),
      perlengkapan: [
        { Akses: "Starter / Ignition System", Cek: "" },
        { Akses: "Kunci Kontak", Cek: "" },
        { Akses: "STNK / Kir / Buku Service", Cek: "" },
        { Akses: "Radio / Tape / Player Merk", Cek: "" },
        { Akses: "Kaset / CD ROM", Cek: "" },
        { Akses: "TV / Monitor Merk", Cek: "" },
        { Akses: "Remote Control", Cek: "" },
        { Akses: "Antena Radio", Cek: "" },
        { Akses: "Lighter / Pemantik", Cek: "" },
        { Akses: "A/C System", Cek: "" },
        { Akses: "Wiper", Cek: "" },
        { Akses: "Safety Belt", Cek: "" },
        { Akses: "Power Window", Cek: "" },
        { Akses: "Seat Cover / Saring Jok", Cek: "" },
        { Akses: "Karpet Dasar", Cek: "" },
        { Akses: "Karpet Tambahan", Cek: "" },
        { Akses: "Spion Dalam", Cek: "" },
        { Akses: "Spion Luar", Cek: "" },
        { Akses: "Emblem / Sticker", Cek: "" },
        { Akses: "Lampu Plafon", Cek: "" },
        { Akses: "Lampu Besar", Cek: "" },
        { Akses: "Lampu Kecil", Cek: "" },
      ],
      perlengkapan2: [
        { Akses: "Lampu Sein / Hazard", Cek: "" },
        { Akses: "Lampu Kabut", Cek: "" },
        { Akses: "Lampu Mundur", Cek: "" },
        { Akses: "Lampu Rem", Cek: "" },
        { Akses: "Velg Racing / Standar", Cek: "" },
        { Akses: "Dop Roda 4 Buah", Cek: "" },
        { Akses: "Ban Serep", Cek: "" },
        { Akses: "Dongkrak", Cek: "" },
        { Akses: "Gagang Dongkrak", Cek: "" },
        { Akses: "Kunci Roda", Cek: "" },
        { Akses: "Tool Set", Cek: "" },
        { Akses: "Segitiga Pengaman", Cek: "" },
        { Akses: "Kotak P3K", Cek: "" },
        { Akses: "Payung", Cek: "" },
        { Akses: "Bantal", Cek: "" },
        { Akses: "Boneka", Cek: "" },
        { Akses: "Kanebo", Cek: "" },
        { Akses: "Tissue", Cek: "" },
        { Akses: "", Cek: "" },
        { Akses: "", Cek: "" },
        { Akses: "", Cek: "" },
        { Akses: "", Cek: "" },
      ],
    };
  },
  mounted() {
    this.id = this.$route.params.data.id;
  },
  created() {
    //2022-09-20 00:00:00.000
    // console.log(this.$route.params.data.Tanggal.substring())
    // console.log(this.$route.params.data.Tanggal.substring(5,7))
    var mounth = this.$route.params.data.Tanggal.substring(5, 7);
    switch (mounth) {
      case "01":
        mounth = "Januari";
        break;
      case "02":
        mounth = "Februari";
        break;
      case "03":
        mounth = "Maret";
        break;
      case "04":
        mounth = "April";
        break;
      case "05":
        mounth = "Mei";
        break;
      case "06":
        mounth = "Juni";
        break;
      case "07":
        mounth = "Juli";
        break;
      case "08":
        mounth = "Agustus";
        break;
      case "09":
        mounth = "September";
        break;
      case "10":
        mounth = "Oktober";
        break;
      case "11":
        mounth = "November";
        break;
      case "12":
        mounth = "Desember";
        break;
    }
    this.dataReport.Tanggal =
      this.$route.params.data.Tanggal.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(0, 4);
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.Pemilik = this.$route.params.data.pemilik.Nama;
    this.dataReport.AlamatPemilik = this.$route.params.data.pemilik.Alamat;
    this.dataReport.Telp = this.$route.params.data.pemilik.Telp;
    this.dataReport.NomorPolisi = this.$route.params.data.NomorPolisi;
    this.dataReport.NomorRangka = this.$route.params.data.NomorRangka;
    this.dataReport.NomorMesin = this.$route.params.data.NomorMesin;
    this.dataReport.Odometer = this.$route.params.data.Odometer;
    this.dataReport.Warna = this.$route.params.data.rangka.Warna;
    this.dataReport.Tahun = this.$route.params.data.rangka.Tahun;
    this.dataReport.MerkType =
      this.$route.params.data.rangka.kendaraan.Merk +
      "/" +
      this.$route.params.data.rangka.kendaraan.Nama;
    this.dataReport.Keterangan = this.$route.params.data.Keterangan;
    //   this.dataReport.Instruksi = this.$route.params.data.rwl
    this.dataReport.Keluhan = this.$route.params.data.keluhan;
    this.dataReport.EmailPerusahaan = JSON.parse(
      localStorage.getItem("info")
    ).Email;
    this.dataReport.AlamatLengkap =
      JSON.parse(localStorage.getItem("info")).Alamat +
      " Telp " +
      JSON.parse(localStorage.getItem("info")).Telepon +
      ", Fax. " +
      JSON.parse(localStorage.getItem("info")).Fax +
      " " +
      JSON.parse(localStorage.getItem("info")).Kota;
    console.log(this.dataReport);
  },
  methods: {
    countCetak(id, token) {
      api
        .put("countCetakan/" + id + "?token=" + token, { modul: "WO" })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadImage() {
      this.isLoaded = true;
    },
    print() {
      // Get HTML to print from element
      const prtHtml = document.getElementById("printing").innerHTML;

      // Get all stylesheets HTML
      let stylesHtml = "";
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style'),
      ]) {
        stylesHtml += node.outerHTML;
      }

      // Open the print window
      const WinPrint = window.open(
        "",
        "",
        "width=" + screen.availWidth + ",height=" + screen.availHeight,
        "left=0,top=0,toolbar=0,scrollbars=0,status=0"
      );
      var is_chrome = Boolean(WinPrint.chrome);
      console.log(is_chrome);
      WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);
      WinPrint.onafterprint = this.countCetak(this.id, this.token);
      WinPrint.document.close();
      if (is_chrome) {
        WinPrint.onload = function () {
          // wait until all resources loaded
          WinPrint.focus(); // necessary for IE >= 10
          WinPrint.print(); // change window to mywindow
          WinPrint.close(); // change window to mywindow
        };
      } else {
        WinPrint.document.close(); // necessary for IE >= 10
        WinPrint.focus(); // necessary for IE >= 10
        WinPrint.print();
      }
      // WinPrint.document.write(`<!DOCTYPE html>
      // <html>
      // <head>
      //     ${stylesHtml}
      // </head>
      // <body>
      //     ${prtHtml}
      // </body>
      // </html>`);
      // console.log(WinPrint)
      // WinPrint.document.close();
      // WinPrint.focus();
      // WinPrint.print();
      // WinPrint.close();
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.perlengkapan {
  margin-top: 15px;
}
/* .perlengkapan table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    } */
.cek {
  width: 40px;
}
.car {
  height: 348px;
  width: 100%;
}
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.judul {
  font-weight: bold;
  font-size: 14px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.isi {
  font-size: 12px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.page {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.row {
  margin: 0%;
  padding: 0%;
}
.col {
  margin: 0%;
  padding: 0%;
}
@media print {
  .header {
    position: fixed;
    height: 100px;
    top: 0;
  }
  thead {
    display: table-header-group;
  }
  tfoot {
    display: table-footer-group;
  }
  .footer {
    position: relative;
    bottom: 0;
  }
  @page {
    margin: 5mm;
  }
  .page {
    page-break-after: always;
  }
}
</style>

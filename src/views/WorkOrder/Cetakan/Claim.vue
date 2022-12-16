<template>
  <v-card>
    <v-btn color="success" @click="print">
      <v-icon>mdi-printer</v-icon>
    </v-btn>
    <v-sheet
      outlined
      width="21cm"
      height="auto"
      class="ma-8 mx-auto elevation-15"
    >
      <div
        id="printing"
        style="padding: 35px; width: 21cm; height: auto; margin: auto"
      >
        <img
          style="width: 250px"
          src="../../../assets/TA_Logo1.png"
          alt="logo"
        />
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          {{ dataReport.AlamatLengkap }}
        </h4>
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          {{ dataReport.EmailPerusahaan }}
        </h4>

        <hr />
        <hr />

        <h4 style="text-align: center">SURAT PERNYATAAN</h4>

        <h3 style="text-align: center; text-decoration: underline">
          PENYELESAIAN KLAIM
        </h3>

        <h4 style="text-align: center; margin-bottom: 15px">
          No. {{ dataReport.KodeNota }}
        </h4>

        <p style="margin: 0">Yang bertanda tangan di bawah ini :</p>

        <v-row style="margin: 0">
          <p style="padding-right: 15px; padding-top: 2px">1.</p>
          <table>
            <tr>
              <td>Nama</td>
              <td>: Moh. Sodik</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>: Jl. Bung Tomo No. 49 RT. 11 Samarinda Seberang</td>
            </tr>
            <tr>
              <td>Jabatan</td>
              <td>: Manager of CAR</td>
            </tr>
          </table>
        </v-row>

        <p style="padding-bottom: 15px">
          Yang selanjutnya disebut sebagai PIHAK PERTAMA
        </p>

        <v-row style="margin: 0">
          <p style="padding-right: 15px; padding-top: 2px">2.</p>
          <table>
            <tr>
              <td>Nama pemilik</td>
              <td>: {{ dataReport.Pemilik }}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>: {{ dataReport.Alamat }}</td>
            </tr>
            <tr>
              <td>Merk / tipe kendaraan</td>
              <td>: {{ dataReport.Merk }} {{ dataReport.Type }}</td>
            </tr>
            <tr>
              <td>Warna</td>
              <td>: {{ dataReport.Warna }}</td>
            </tr>
            <tr>
              <td>No. Polisi</td>
              <td>: {{ dataReport.NomorPolisi }}</td>
            </tr>
            <tr>
              <td>Tahun Pembuatan</td>
              <td>: {{ dataReport.Tahun }}</td>
            </tr>
            <tr>
              <td>No. Rangka / NIK</td>
              <td>: {{ dataReport.NomorRangka }}</td>
            </tr>
            <tr>
              <td>No. Mesin</td>
              <td>: {{ dataReport.NomorMesin }}</td>
            </tr>
            <tr>
              <td>Asuransi</td>
              <td>: {{ dataReport.Pelanggan }}</td>
            </tr>
            <tr>
              <td>Tanggal Masuk / Keluar</td>
              <td>: {{ dataReport.TanggalMasukKeluar }}</td>
            </tr>
          </table>
        </v-row>

        <p style="padding-bottom: 15px">
          Yang selanjutnya disebut sebagai PIHAK KEDUA
        </p>
        <p>
          Dengan ini Pihak Pertama telah menyelesaikan pekerjaan atau klaim
          kendaraan Pihak Kedua, dan Pihak Kedua dengan ini menyatakan :
        </p>

        <table>
          <tr>
            <td>1.</td>
            <td>
              Pihak Kedua telah memeriksa dan menyatakan rasa puas atas
              pekerjaan Pihak Pertama kemudian Pihak Kedua telah menerima
              kendaraan tersebut dalam kondisi baik sesuai dengan klaim yang
              telah diajukan, yang tercantum didalam SPK Asuransi.
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>
              Berdasarkan poin 1 (satu) tersebut di atas, Pihak Kedua menyatakan
              tidak akan menuntut dikemudian hari sehubungan dengan klaim
              tersebut, kepada Pihak Pertama maupun kepada Pihak Asuransi.
            </td>
          </tr>
          <tr>
            <td>3.</td>
            <td>
              Dengan pernyataan di atas, maka kami Pihak Pertama berhak menerima
              pembayaran dari Pihak Asuransi yang menjamin kendaraan tersebut
              untuk menyelesaikan biaya administrasi klaim.
            </td>
          </tr>
        </table>
        <p>
          Demikian surat pernyataan klaim ini dibuat untuk dipergunakan
          sebagaimana mestinya.
        </p>
        <p style="text-align: right; padding-bottom: 30px">
          Samarinda, {{ dataReport.TanggalKeluar }}
        </p>
        <v-row>
          <v-col>
            <p style="text-align: center; font-weight: bold">Tertanggung,</p>
          </v-col>
          <v-col>
            <p style="text-align: center; font-weight: bold">Bengkel,</p>
          </v-col>
        </v-row>
        <p style="text-align: right; margin-top: 70px">
          <i>Dicetak : CGAACA 10:14</i>
        </p>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import api from "@/services/http";
export default {
  data() {
    return {
      id: "",
      token: localStorage.getItem("token"),
      dataReport: {},
    };
  },
  mounted() {
    this.id = this.$route.params.data.id;
  },
  created() {
    console.log(this.$route);
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
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.Pemilik = this.$route.params.data.pemilik.Nama;
    let kotaPemilik =
      this.$route.params.data.pemilik.Kota == null
        ? ""
        : this.$route.params.data.pemilik.Kota;
    this.dataReport.Alamat =
      this.$route.params.data.pemilik.Alamat + ", " + kotaPemilik;
    this.dataReport.NomorPolisi = this.$route.params.data.NomorPolisi;
    this.dataReport.NomorMesin = this.$route.params.data.NomorMesin;
    this.dataReport.NomorRangka = this.$route.params.data.NomorRangka;
    this.dataReport.Tahun = this.$route.params.data.rangka.Tahun;
    this.dataReport.Warna = this.$route.params.data.rangka.Warna;
    this.dataReport.Merk = this.$route.params.data.rangka.kendaraan.Merk;
    this.dataReport.Type = this.$route.params.data.rangka.kendaraan.Nama;
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
    let blnKeluar = this.$route.params.data.estimasi.TanggalKeluar.substring(
      5,
      7
    );
    let blnMasuk = this.$route.params.data.estimasi.TanggalMasuk.substring(
      5,
      7
    );
    switch (blnKeluar) {
      case "01":
        blnKeluar = "Januari";
        break;
      case "02":
        blnKeluar = "Februari";
        break;
      case "03":
        blnKeluar = "Maret";
        break;
      case "04":
        blnKeluar = "April";
        break;
      case "05":
        blnKeluar = "Mei";
        break;
      case "06":
        blnKeluar = "Juni";
        break;
      case "07":
        blnKeluar = "Juli";
        break;
      case "08":
        blnKeluar = "Agustus";
        break;
      case "09":
        blnKeluar = "September";
        break;
      case "10":
        blnKeluar = "Oktober";
        break;
      case "11":
        blnKeluar = "November";
        break;
      case "12":
        blnKeluar = "Desember";
        break;
    }
    switch (blnMasuk) {
      case "01":
        blnMasuk = "Januari";
        break;
      case "02":
        blnMasuk = "Februari";
        break;
      case "03":
        blnMasuk = "Maret";
        break;
      case "04":
        blnMasuk = "April";
        break;
      case "05":
        blnMasuk = "Mei";
        break;
      case "06":
        blnMasuk = "Juni";
        break;
      case "07":
        blnMasuk = "Juli";
        break;
      case "08":
        blnMasuk = "Agustus";
        break;
      case "09":
        blnMasuk = "September";
        break;
      case "10":
        blnMasuk = "Oktober";
        break;
      case "11":
        blnMasuk = "November";
        break;
      case "12":
        blnMasuk = "Desember";
        break;
    }
    this.dataReport.TanggalMasukKeluar =
      this.$route.params.data.estimasi.TanggalMasuk.substring(8, 10) +
      " " +
      blnMasuk +
      this.$route.params.data.estimasi.TanggalMasuk.substring(0, 4) +
      " / " +
      this.$route.params.data.estimasi.TanggalKeluar.substring(8, 10) +
      " " +
      blnKeluar +
      this.$route.params.data.estimasi.TanggalKeluar.substring(0, 4);
    this.dataReport.TanggalKeluar =
      this.$route.params.data.estimasi.TanggalKeluar.substring(8, 10) +
      " " +
      blnKeluar +
      this.$route.params.data.estimasi.TanggalKeluar.substring(0, 4);
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
        WinPrint.close();
      }
      // WinPrint.document.close();
      // WinPrint.focus();
      // WinPrint.print();
      // WinPrint.close();
    },
  },
};
</script>

<style scoped>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
table {
  width: 95%;
}
table td {
  font-size: 10;
  vertical-align: top;
  font-family: sans-serif;
}
p {
  font-size: 10;
  font-family: sans-serif;
}
html {
  font-size: 12px;
}
</style>

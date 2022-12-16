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
          class="logo"
          style="
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 250px;
          "
          src="../../../assets/TA_Logo1.png"
          alt="logo"
        />
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          {{ dataReport.AlamatLengkap }}
        </h4>
        <h4 style="text-align: center; font-size:15px font-family: calibri;">
          email : {{ dataReport.EmailPerusahaan }}
        </h4>
        <hr />
        <hr />
        <h3 style="text-align: center; text-decoration: underline">INVOICE</h3>
        <table>
          <tr>
            <td style="width: 60%; text-align: right; padding-right: 10px">
              No Invoice
            </td>
            <td style="width: 20%">: {{ dataReport.KodeNota }}</td>
          </tr>
          <tr>
            <td style="text-align: right; padding-right: 30px">No WO</td>
            <td>: {{ dataReport.NomorWO }}</td>
          </tr>
        </table>
        <table style="width: 100%">
          <tr>
            <td style="width: 20%">Sudah Terima Dari</td>
            <td style="width: auto">:</td>
            <td style="width: 80%">{{ dataReport.Pemilik }}</td>
          </tr>
          <tr height="50px;">
            <td style="width: 20%; vertical-align: text-top">Terbilang</td>
            <td style="vertical-align: text-top; width: auto">:</td>
            <td style="width: 80%; vertical-align: text-top">
              {{ dataReport.Terbilang }}
            </td>
          </tr>
          <tr>
            <td style="width: 20%; vertical-align: text-top">
              Untuk Pembayaran
            </td>
            <td style="vertical-align: text-top; width: auto">:</td>
            <td style="width: 80%; vertical-align: text-top">
              {{ dataReport.KeteranganPembayaran }}.
            </td>
          </tr>
        </table>

        <table style="width: 70%; margin-top: 15px">
          <tr>
            <td style="width: 50%">Material</td>
            <td style="width: 10px">:</td>
            <td style="width: 40%; text-align: right">
              {{
                dataReport.pekerjaan.Material.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
          <tr>
            <td>Jasa</td>
            <td>:</td>
            <td style="text-align: right">
              {{
                dataReport.pekerjaan.Perbaikan.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
          <tr>
            <td>Spare Parts</td>
            <td>:</td>
            <td style="text-align: right">
              {{
                dataReport.Part.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
          <tr>
            <td>Transportasi & Akomodasi</td>
            <td>:</td>
            <td style="text-align: right">
              {{
                dataReport.pekerjaan.Transportasi.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
          <tr>
            <td>Evakuasi, Mobilisasii & Pengawalan</td>
            <td>:</td>
            <td style="text-align: right; border-bottom: 1px solid black">
              {{
                dataReport.pekerjaan.Evakuasi.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
          <tr height="40px;" style="vertical-align: text-top">
            <td>Subtotal</td>
            <td>:</td>
            <td style="text-align: right">
              {{
                dataReport.SubTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
          <tr>
            <td>DPP</td>
            <td>:</td>
            <td style="text-align: right">
              {{
                dataReport.SubTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
          <tr>
            <td>PPn {{ dataReport.PPnPersen }}%</td>
            <td>:</td>
            <td style="text-align: right; border-bottom: 1px solid black">
              {{
                dataReport.PPn.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
          <tr style="font-weight: bold">
            <td>Grand Total</td>
            <td>:</td>
            <td style="text-align: right">
              {{
                dataReport.GrandTotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </td>
          </tr>
        </table>
        <v-row style="margin-top: 30px">
          <v-col>
            <p>Rincian Pembayaran :</p>
          </v-col>
          <v-col>
            <p style="text-align: right; margin-right: 70px">
              Samarinda, {{ dataReport.Tanggal }}
            </p>
          </v-col>
        </v-row>
        <v-row style="font-weight: bold">
          <v-col>
            <p>Kewajiban Asuransi</p>
          </v-col>
          <v-col style="margin-left: -100px">
            <p>:</p>
          </v-col>
          <v-col style="margin-left: -100px">
            <p style="margin-left: -100px">
              {{
                parseFloat(dataReport.KAss).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </p>
          </v-col>
        </v-row>
        <v-row style="font-weight: bold">
          <v-col>
            <p>Kewajiban Tertanggung</p>
          </v-col>
          <v-col style="margin-left: -100px">
            <p>:</p>
          </v-col>
          <v-col style="margin-left: -100px">
            <p style="margin-left: -100px">
              {{
                parseFloat(dataReport.KTtg).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </p>
          </v-col>
        </v-row>
        <div style="text-align: right; margin-top: 55px">
          <p style="margin-right: 90px; text-decoration: underline">
            STEPHEN CHRISTIANTO
          </p>
          <p style="margin-right: 130px">PIMPINAN</p>
        </div>
        <p>Keterangan :</p>
        <p>
          1. Mohon pembayaran dapat ditransfer ke BCA 861-588-7788 atau Mandiri
          148-001-899-7778 a/n PT. TRINITY AUTO
        </p>
        <p>2. Mohon bukti transfer dikirim via email ke fin@trinityauto.id</p>
        <p>
          3. Pembayaran dianggap sah apabila uang sudah masuk ke rekening kami
        </p>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import api from "@/services/http";
import angkaTerbilang from "@develoka/angka-terbilang-js";
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
    this.dataReport.NomorWO = this.$route.params.data.NomorWO;
    this.dataReport.NomorRangka = this.$route.params.data.NomorRangka;
    this.dataReport.Pemilik = this.$route.params.data.wo.pemilik.Nama;
    this.dataReport.KeteranganPembayaran =
      "Unit " +
      this.$route.params.data.rangka.kendaraan.Merk +
      " " +
      this.$route.params.data.rangka.kendaraan.Nama +
      " / " +
      this.$route.params.data.NomorPolisi +
      " / " +
      this.$route.params.data.NomorRangka +
      " Atas Nama " +
      this.$route.params.data.pelanggan.Nama;
    this.dataReport.pekerjaan = {
      Evakuasi: this.$route.params.data.pekerjaan
        .filter(
          (m) => m.kerja.GrupPekerjaan == "EVAKUASI, MOBILISASI & PENGAWALAN"
        )
        .reduce((a, b) => a + parseFloat(b.SubTotal), 0),
      Material: this.$route.params.data.pekerjaan
        .filter((m) => m.kerja.GrupPekerjaan == "MATERIAL")
        .reduce((a, b) => a + parseFloat(b.SubTotal), 0),
      Perbaikan: this.$route.params.data.pekerjaan
        .filter((m) => m.kerja.GrupPekerjaan == "PEKERJAAN PERBAIKAN")
        .reduce((a, b) => a + parseFloat(b.SubTotal), 0),
      Transportasi: this.$route.params.data.pekerjaan
        .filter((m) => m.kerja.GrupPekerjaan == "TRANSPORTASI & AKOMODASI")
        .reduce((a, b) => a + parseFloat(b.SubTotal), 0),
    };
    this.dataReport.Part = this.$route.params.data.barang.reduce(
      (a, b) => a + parseFloat(b.SubTotal),
      0
    );
    this.dataReport.SubTotal =
      Object.values(this.dataReport.pekerjaan).reduce(
        (a, b) => a + parseFloat(b),
        0
      ) + this.dataReport.Part;
    this.dataReport.Tanggal =
      this.$route.params.data.Tanggal.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(0, 4);
    this.dataReport.KAss = this.$route.params.data.KAss;
    this.dataReport.KTtg = this.$route.params.data.KTtg;

    this.dataReport.PPn = parseFloat(this.$route.params.data.PPn);
    this.dataReport.GrandTotal = parseFloat(this.$route.params.data.TotalBayar);
    this.dataReport.PPnPersen = parseInt(this.$route.params.data.PPnPersen);
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
    this.dataReport.Terbilang =
      angkaTerbilang(parseFloat(this.dataReport.GrandTotal)).toUpperCase() +
      " RUPIAH";
    console.log(this.dataReport);
  },
  methods: {
    countCetak(id, token) {
      api
        .put("countCetakan/" + id + "?token=" + token, { modul: "INV" })
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
.row {
  margin: 0%;
  padding: 0%;
}
.col {
  width: 50%;
  margin: 0%;
  padding: 0%;
}
p {
  margin: 0%;
  font-size: 14px;
  font-family: calibri;
}
td {
  font-size: 14px;
  font-family: calibri;
}
</style>

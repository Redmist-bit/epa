<template>
  <v-card>
    <v-btn color="success" @click="print">
      <v-icon>mdi-printer</v-icon>
    </v-btn>
    <v-container>
      <v-sheet width="21cm" height="auto" class="ma-8 mx-auto elevation-15">
        <div
          id="printing"
          style="padding: 35px; width: 21cm; height: auto; margin: auto"
        >
          <v-row>
            <v-col md="6">
              <h3 style="padding-left: 100px">Doc Check List</h3>
            </v-col>
            <v-col md="6">
              <h4>Tanggal : {{ dataReport.Tanggal }}</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <h4>No WO : {{ dataReport.KodeNota }}</h4>
            </v-col>
            <v-col md="6">
              <h4>Pelanggan : {{ dataReport.Pelanggan }}</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <h4>NoPol : {{ dataReport.NomorPolisi }}</h4>
            </v-col>
            <v-col md="6">
              <h4>Pemilik : {{ dataReport.Pemilik }}</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6">
              <h4>Lokasi : {{ dataReport.Lokasi }}</h4>
            </v-col>
            <v-col md="6">
              <h4>Lessor : {{ dataReport.Lessor }}</h4>
            </v-col>
          </v-row>
          <table>
            <thead>
              <tr>
                <th style="width: 35%">Dokumen</th>
                <th style="width: 10%">Tanggal</th>
                <th style="width: 15%">Paraf</th>
                <th style="width: 40%">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tingkat1">Work Order</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat1">Finance Information</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Asuransi</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat3">Outstanding Payment</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat3">Aging Piutang</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Pribadi / Pemilik Unit</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat3">Outstanding Payment</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat3">Aging Piutang</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat1">Dokumen Claim</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Form Klaim</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Berita Acara</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Simper / Kimper</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">NRV vs TSI</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style="text-align: center">CUKUP / UNDER INSURED</td>
              </tr>
              <tr>
                <td class="tingkat2">STNK / SIM</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Lembar Gesek Rangka Mesin</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Surat Pengantar</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Berita Acara Kejadian</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat1">Estimasi Perbaikan / Penawaran</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat1">Internal Work Order</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat1">Internal Part Order</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat1">Dokumen Invoice</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Surat Perintah Kerja (SPK)</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Surat Pengalihan Pembayaran</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Surat Pengiriman Barang</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Surat Pernyataan Penyelesaian Klaim</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Berita Acara Serah Terima</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat1">Invoicing</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Invoice</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td class="tingkat2">Faktur Pajak</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-sheet>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dataReport: {},
    };
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
    this.dataReport.Tanggal =
      this.$route.params.data.Tanggal.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(0, 4);
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Lokasi = this.$route.params.data.Lokasi;
    this.dataReport.Lessor =
      this.$route.params.data.lessor == null
        ? ""
        : this.$route.params.data.lessor.Nama;
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.Pemilik = this.$route.params.data.pemilik.Nama;
    this.dataReport.NomorPolisi = this.$route.params.data.NomorPolisi;
    console.log(this.dataReport);
  },
  methods: {
    print() {
      // await this.$htmlToPaper('printing')
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

      WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);
      console.log(WinPrint);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
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
  margin: 0%;
  padding: 0%;
}
table {
  font-family: sans-serif;
  width: 100%;
  margin-top: 10px;
  height: auto;
  border: 1px solid black;
  border-collapse: collapse;
}
tr td {
  border: thin solid black;
  padding-left: 10px;
  font-size: 14px;
}
tr th {
  border: thin solid black;
}
.tingkat1 {
  padding-left: 10px;
  font-weight: bold;
}
.tingkat2 {
  padding-left: 20px;
}
.tingkat3 {
  padding-left: 30px;
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
    margin: 20mm;
  }
  .page {
    page-break-after: always;
  }
}
</style>

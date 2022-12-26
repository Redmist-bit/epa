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
        <h3>PENERIMAAN PIUTANG</h3>
        <v-row style="margin-top: -10px">
          <v-col>
            <p style="margin-left: 13px">
              Kode Nota : {{ dataReport.KodeNota }}
            </p>
          </v-col>
          <v-col>
            <p style="margin-left: 40px">Tanggal : {{ dataReport.Tanggal }}</p>
          </v-col>
        </v-row>
        <v-row style="margin-top: -10px; margin-bottom: 10px">
          <p style="font-weight: bold">Dari :</p>
          <p>{{ dataReport.Customer }}</p>
        </v-row>
        <!-- isi -->
        <table>
          <tbody>
            <tr>
              <td>
                <div class="page">
                  <table class="isi" style="margin-top: -10px">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Keterangan</th>
                        <th>Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dataReport.items"
                        :key="index"
                      >
                        <td style="width: 5%">{{ index + 1 }}</td>
                        <td style="width: 70%">{{ item.Keterangan }}</td>
                        <td style="width: 25%; text-align: right">
                          {{
                            parseFloat(item.Jumlah).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div class="footer">
                  <!-- terbilang -->
                  <table>
                    <tr height="40px" style="vertical-align: text-top">
                      <td>Terbilang</td>
                      <td>: {{ dataReport.Terbilang }}</td>
                      <td style="font-weight: bold">Total :</td>
                      <td style="font-weight: bold; text-align: right">
                        {{
                          parseFloat(dataReport.total).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>Keterangan</td>
                      <td>: {{ dataReport.Keterangan }}</td>
                    </tr>
                  </table>
                  <!-- ttd -->
                  <table
                    style="
                      width: 100%;
                      margin-top: 10px;
                      border-collapse: collapse;
                    "
                  >
                    <tr>
                      <td
                        style="
                          padding-left: 5px;
                          height: 50px;
                          vertical-align: text-top;
                          font-size: 12px;
                          border: 1px solid black;
                          font-weight: none;
                        "
                      >
                        Keuangan,
                      </td>
                      <td
                        style="
                          padding-left: 5px;
                          height: 50px;
                          vertical-align: text-top;
                          font-size: 12px;
                          border: 1px solid black;
                          font-weight: none;
                        "
                      >
                        Di Setujui Oleh,
                      </td>
                      <td
                        style="
                          padding-left: 5px;
                          height: 50px;
                          vertical-align: text-top;
                          font-size: 12px;
                          border: 1px solid black;
                          font-weight: none;
                        "
                      >
                        Di Buat Oleh,
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import angkaTerbilang from "@develoka/angka-terbilang-js";
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
    // console.log(this.$route)
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
    this.dataReport.Keterangan = this.$route.params.data.Keterangan;
    this.dataReport.Customer = this.$route.params.data.customer.Nama;
    this.dataReport.Tanggal =
      this.$route.params.data.Tanggal.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(0, 4);
    this.dataReport.total = this.$route.params.data.Total;
    this.dataReport.items = this.$route.params.data.itemsinvoice
      .map((m) => {
        m.Keterangan =
          "Pembayaran invoice " +
          m.invoice.KodeNota +
          " (" +
          m.invoice.wo.NomorPolisi +
          ")";
        return m;
      })
      .filter((f) => f.Jumlah > 0);
    this.dataReport.Terbilang =
      angkaTerbilang(parseFloat(this.dataReport.total)).toUpperCase() +
      " RUPIAH";
    console.log(angkaTerbilang(this.dataReport.total));
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
  },
  methods: {
    countCetak(id, token) {
      api
        .put("countCetakan/" + id + "?token=" + token, { modul: "PIUTANG" })
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
}
.col p {
  font-weight: bold;
  margin: 0%;
}
h3 {
  text-align: center;
  font-family: calibri;
}
p {
  font-family: calibri;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-family: calibri;
}
.isi thead th {
  border: 1px solid black;
}
.isi tbody td {
  border: 1px solid black;
  font-size: 14px;
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

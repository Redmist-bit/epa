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
        <h3 style="text-align: center">INVOICE</h3>
        <table>
          <tr>
            <td>Merk/Tipe</td>
            <td>: {{ dataReport.MerkType }}</td>
            <td>No Invoice</td>
            <td>: {{ dataReport.KodeNota }}</td>
          </tr>
          <tr>
            <td>Nomor Lambung</td>
            <td>: {{ dataReport.NomorPolisi }}</td>
            <td>Tanggal</td>
            <td>: {{ dataReport.Tanggal }}</td>
          </tr>
          <tr>
            <td>No WO</td>
            <td>: {{ dataReport.NomorWO }}</td>
            <td>Nama</td>
            <td>: {{ dataReport.Pelanggan }}</td>
          </tr>
        </table>
        <table>
          <tbody>
            <tr>
              <td>
                <div class="page">
                  <table class="isi" style="margin-top: 10px">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th colspan="2">Keterangan</th>
                        <th>Jumlah</th>
                        <th colspan="2">Total Harga & Diskon</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in dataReport.itemsBarang" :key="i">
                        <td style="width: 4%; text-align: center">
                          {{ i + 1 }}
                        </td>
                        <td style="width: 31%">{{ item.barang.Nama }}</td>
                        <td style="width: 19%">
                          {{ item.barang.PartNumber1 }}
                        </td>
                        <td style="width: 6%; text-align: center">
                          {{ item.Jumlah }}
                        </td>
                        <td style="width: 20%; text-align: right">
                          {{
                            parseFloat(item.Harga).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          }}
                          ({{ item.Diskon1 }})
                        </td>
                        <td style="width: 20%; text-align: right">
                          {{
                            parseFloat(item.SubTotal).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          }}
                        </td>
                      </tr>
                      <tr
                        v-for="(item, j) in dataReport.itemsPekerjaan"
                        :key="j"
                      >
                        <td style="width: 4%; text-align: center">
                          {{ j + 1 + dataReport.itemsBarang.length }}
                        </td>
                        <td style="width: 31%">{{ item.kerja.Nama }}</td>
                        <td style="width: 19%">{{ item.Keterangan }}</td>
                        <td style="width: 6%; text-align: center">
                          {{ item.Jumlah }}
                        </td>
                        <td style="width: 20%; text-align: right">
                          {{
                            parseFloat(item.Harga).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          }}
                          ({{ item.Diskon1 }})
                        </td>
                        <td style="width: 20%; text-align: right">
                          {{
                            parseFloat(item.SubTotal).toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          }}
                        </td>
                      </tr>
                      <!-- <tr>
                                                <td style="width:4%; text-align:center;">1</td>
                                                <td style="width:31%;">JASA MURNI PERBAIKAN</td>
                                                <td style="width:19%;">&nbsp;</td>
                                                <td style="width:6%; text-align:center;">1</td>
                                                <td style="width:20%; text-align:right;">400,000.00 (0.00)</td>
                                                <td style="width:20%; text-align:right;">400,000.00</td>
                                            </tr> -->
                      <tr>
                        <td
                          colspan="4"
                          style="font-weight: bold; text-align: center"
                        >
                          SUB TOTAL
                        </td>
                        <td
                          colspan="2"
                          style="font-weight: bold; text-align: right"
                        >
                          {{
                            dataReport.DPP.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="4"
                          style="font-weight: bold; text-align: center"
                        >
                          PPN
                        </td>
                        <td
                          colspan="2"
                          style="font-weight: bold; text-align: right"
                        >
                          {{
                            dataReport.PPn.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="4"
                          style="font-weight: bold; text-align: center"
                        >
                          TOTAL BAYAR
                        </td>
                        <td
                          colspan="2"
                          style="font-weight: bold; text-align: right"
                        >
                          {{
                            dataReport.Total.toLocaleString(undefined, {
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
            <table style="margin-top: 5px" class="terbilang">
              <tr>
                <td style="padding-left: 5px; width: 11%">TERBILANG :</td>
                <td style="padding-left: 5px">
                  <i>{{ dataReport.Terbilang }}</i>
                </td>
              </tr>
            </table>
            <p>Keterangan :</p>
            <p>
              1. Mohon pembayaran dapat ditransfer ke BCA 861-588-7788 atau
              Mandiri 148-001-899-7778 a/n PT. TRINITY AUTO
            </p>
            <p>
              2. Mohon bukti transfer dikirim via email ke fin@trinityauto.id
            </p>
            <p>
              3. Pembayaran dianggap sah apabila uang sudah masuk ke rekening
              kami
            </p>
            <p
              style="
                text-align: right;
                margin-right: 100px;
                margin-bottom: 35px;
                margin-top: 20px;
              "
            >
              Hormat Kami,
            </p>
            <p style="text-align: right; margin-right: 75px; margin-top: 70px">
              STEPHEN CHRISTIANTO
            </p>
          </tfoot>
        </table>
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
    console.log(this.$route);
    var mounth = this.$route.params.data.Tanggal.substring(3, 5);
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
    // this.dataReport.Keterangan = this.$route.params.data.Keterangan
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.NomorWO = this.$route.params.data.NomorWO;
    this.dataReport.NomorPolisi = this.$route.params.data.NomorPolisi;
    this.dataReport.MerkType =
      this.$route.params.data.rangka.kendaraan.Merk +
      " " +
      this.$route.params.data.rangka.kendaraan.Nama;
    this.dataReport.Tanggal =
      this.$route.params.data.Tanggal.substring(0, 2) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(6, 10);
    this.dataReport.itemsBarang = this.$route.params.data.barang;
    this.dataReport.itemsPekerjaan = this.$route.params.data.pekerjaan;
    this.dataReport.DPP = parseFloat(this.$route.params.data.DPP);
    this.dataReport.PPn = parseFloat(this.$route.params.data.PPn);
    this.dataReport.Total = parseFloat(this.$route.params.data.TotalBayar);
    this.dataReport.Terbilang =
      angkaTerbilang(this.dataReport.Total).toUpperCase() + " RUPIAH";
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
table {
  width: 100%;
  border-collapse: collapse;
  font-family: calibri;
  font-size: 14px;
}
.isi thead th {
  border: 1px solid black;
}
.isi tbody td {
  border: 1px solid black;
}
.terbilang {
  border: 1px solid black;
}
.terbilang td {
  /* border-top: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        border-left: 1px solid black; */
  font-weight: bold;
}
p {
  margin: 0%;
  font-family: calibri;
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

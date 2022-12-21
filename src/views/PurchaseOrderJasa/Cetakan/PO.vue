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
          {{ dataReport.EmailPerusahaan }}
        </h4>
        <hr />
        <hr />
        <h2 style="text-align: center">PURCHASE ORDER</h2>
        <v-row>
          <v-col>
            <h4>KodeNota : {{ dataReport.KodeNota }}</h4>
          </v-col>
          <v-col>
            <h4>Tanggal : {{ dataReport.Tanggal }}</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4>Kepada :</h4>
          </v-col>
          <v-col>
            <h4>
              Kendaraan: {{ dataReport.Kendaraan }} ({{ dataReport.Tahun }})
            </h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>{{ dataReport.Supplier }}</p>
          </v-col>
          <v-col>
            <p>Nomor Rangka : {{ dataReport.NoRangka }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>{{ dataReport.Alamat }}</p>
          </v-col>
          <v-col>
            <p>Nomor Mesin : {{ dataReport.NoMesin }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>{{ dataReport.Kota }}</p>
          </v-col>
          <v-col>
            <p>Tipe : {{ dataReport.Tipe }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>WO : {{ dataReport.NoWorkOrder }}</p>
          </v-col>
          <v-col>
            <p>Pemilik : {{ dataReport.Pemilik }}</p>
          </v-col>
        </v-row>
        <!-- isi -->
        <table>
          <tbody>
            <tr>
              <td>
                <div class="page">
                  <table class="isi">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Keterangan</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Diskon</th>
                        <th>Sub Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dataReport.items"
                        :key="index"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.Keterangan }}</td>
                        <td class="nominal">{{ item.Jumlah }}</td>
                        <td style="text-align: right">
                          {{ item.Harga.toLocaleString(undefined) }}
                        </td>
                        <td style="text-align: right">{{ item.Diskon1 }}</td>
                        <td style="text-align: right">
                          {{
                            (
                              parseFloat(item.SubTotal) -
                              parseFloat(item.SubDiskon)
                            ).toLocaleString(undefined)
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
                  <!-- Terbilang -->
                  <table style="width: 100%">
                    <tr>
                      <td
                        rowspan="2"
                        style="width: 10%; vertical-align: text-top"
                      >
                        Terbilang
                      </td>
                      <td
                        rowspan="2"
                        style="width: 60%; vertical-align: text-top"
                      >
                        : {{ dataReport.Terbilang }}
                      </td>
                      <td style="width: 10%; text-align: right">DPP :</td>
                      <td style="text-align: right; width: 20%">
                        {{ dataReport.DPP }}
                      </td>
                    </tr>
                    <tr>
                      <!-- <td>&nbsp;</td>
                                            <td>&nbsp;</td> -->
                      <td style="width: 10%; text-align: right">PPn :</td>
                      <td style="text-align: right; width: 20%">
                        {{ dataReport.PPn }}
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 10%">Keterangan</td>
                      <td style="width: 60%">: {{ dataReport.Keterangan }}</td>
                      <td style="width: 15%; text-align: right">Grand Total</td>
                      <td style="text-align: right; width: 20%">
                        {{ dataReport.TotalBayar }}
                      </td>
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
                        SCM,
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
                        Produksi,
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
                        Kepala Divisi,
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
                        Finance,
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
                        Supplier,
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
    var mounth = this.$route.params.data.Tanggal.substring(5, 7);
    // console.log(mounth)
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
    this.dataReport.Supplier = this.$route.params.data.supplier.Nama;
    this.dataReport.Alamat = this.$route.params.data.supplier.Alamat;
    this.dataReport.Kota = this.$route.params.data.supplier.Kota;
    this.dataReport.Tanggal =
      this.$route.params.data.Tanggal.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(0, 4);
    this.dataReport.NoWorkOrder =
      this.$route.params.data.wo.KodeNota +
      " ( " +
      this.$route.params.data.wo.Lokasi +
      " )";
    this.dataReport.NoPO = this.$route.params.data.NoPO;
    this.dataReport.NoRangka = this.$route.params.data.wo.NomorRangka;
    this.dataReport.NoMesin = this.$route.params.data.wo.NomorMesin;
    this.dataReport.Pemilik = this.$route.params.data.wo.pemilik.Nama;
    this.dataReport.Kendaraan = this.$route.params.data.wo.NomorPolisi;
    this.dataReport.IsiSilinder =
      this.$route.params.data.wo.rangka.kendaraan.IsiSilinder;
    this.dataReport.Tahun = this.$route.params.data.wo.rangka.Tahun;
    this.dataReport.Tipe =
      this.$route.params.data.wo.rangka.kendaraan.Merk +
      " " +
      this.$route.params.data.wo.rangka.kendaraan.Nama;
    this.dataReport.items = this.$route.params.data.items_jasa;
    this.dataReport.Total = this.$route.params.data.DPP;
    this.dataReport.TotalBayar = parseFloat(
      this.$route.params.data.TotalBayar
    ).toLocaleString(undefined);
    this.dataReport.PPn = parseFloat(
      this.$route.params.data.PPn
    ).toLocaleString(undefined);
    this.dataReport.DPP = parseFloat(
      this.$route.params.data.DPP
    ).toLocaleString(undefined);
    this.dataReport.Terbilang =
      angkaTerbilang(
        parseFloat(this.$route.params.data.TotalBayar)
      ).toUpperCase() + " RUPIAH";
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Keterangan = this.$route.params.data.Keterangan;
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
        .put("countCetakan/" + id + "?token=" + token, { modul: "PO" })
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
  margin: 0%;
  padding: 0%;
}
p {
  margin: 0%;
}
.isi {
  font-family: calibri;
  border: 1px solid black;
  border-collapse: collapse;
  font-family: calibri;
  font-size: 14px;
}
.isi td {
  border: 1px solid black;
  font-family: calibri;
  font-size: 14px;
}
.isi th {
  border: 1px solid black;
  font-family: calibri;
  font-size: 14px;
}
table {
  width: 100%;
  font-family: calibri;
  font-size: 14px;
}
h4 {
  font-family: calibri;
}
p {
  font-family: calibri;
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

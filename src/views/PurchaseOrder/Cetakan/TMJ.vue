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
        <table style="width: 100%">
          <tr>
            <td class="header-kiri">Trinity Mahakam Jaya</td>
            <td style="text-align: center; font-weight: bold">
              KodeNota : {{ dataReport.KodeNota }}
            </td>
          </tr>
          <tr>
            <td class="header-kiri">Jl. Nahkoda Blok II No 3 Rt. 03</td>
            <td style="text-align: center; font-weight: bold">
              Tanggal : {{ dataReport.Tanggal }}
            </td>
          </tr>
          <tr>
            <td class="header-kiri">Samarinda</td>
            <td style="text-align: center">
              Nomor WO : {{ dataReport.NomorWO }}
            </td>
          </tr>
          <tr>
            <td class="header-kiri">Telp : 0541 - 737578</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="header-kiri">Fax : 0541 - 737578</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class="header-kiri">Email : trinity_mj1@yahoo.co.id</td>
            <td style="text-align: right; font-size: 22px; font-weight: bold">
              PURCHASE ORDER
            </td>
          </tr>
        </table>
        <p style="margin-top: -10px; margin-bottom: 0px; font-weight: bold">
          ===============================================================================
        </p>
        <table style="font-family: calibri; width: 100%">
          <tr>
            <td>Kepada :</td>
            <td>
              Kendaraan : {{ dataReport.Kendaraan }} ({{ dataReport.Tahun }})
            </td>
          </tr>
          <tr>
            <td>{{ dataReport.Supplier }}</td>
            <td>Nomor Rangka : {{ dataReport.NoRangka }}</td>
          </tr>
          <tr>
            <td>{{ dataReport.Alamat }}</td>
            <td>Nomor Mesin : {{ dataReport.NoMesin }}</td>
          </tr>
          <tr>
            <td>{{ dataReport.Kota }}</td>
            <td>Tipe : {{ dataReport.Tipe }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Pemilik : {{ dataReport.Pemilik }}</td>
          </tr>
        </table>
        <table style="width: 100%">
          <tbody>
            <tr>
              <td>
                <div class="page">
                  <!-- isi -->
                  <table
                    style="
                      font-family: calibri;
                      border: 1px solid black;
                      border-collapse: collapse;
                      width: 100%;
                    "
                  >
                    <thead>
                      <tr>
                        <th style="border: 1px solid black">No</th>
                        <th style="border: 1px solid black">Part Number</th>
                        <th style="border: 1px solid black">Part Name</th>
                        <th style="border: 1px solid black">Jumlah</th>
                        <th style="border: 1px solid black">Harga</th>
                        <th style="border: 1px solid black">Diskon</th>
                        <th style="border: 1px solid black">Sub Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in dataReport.items"
                        :key="index"
                      >
                        <td style="border: 1px solid black; text-align: center">
                          {{ index + 1 }}
                        </td>
                        <td style="border: 1px solid black">
                          {{ item.barang.PartNumber1 }}
                        </td>
                        <td style="border: 1px solid black">
                          {{ item.barang.Nama }}
                        </td>
                        <td style="border: 1px solid black; text-align: right">
                          {{ item.Jumlah + item.satuan.Nama }}
                        </td>
                        <td style="border: 1px solid black; text-align: right">
                          {{ item.Harga.toLocaleString(undefined) }}
                        </td>
                        <td style="border: 1px solid black; text-align: right">
                          {{ item.Diskon1 }}
                        </td>
                        <td style="border: 1px solid black; text-align: right">
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
                  <table
                    style="
                      font-family: calibri;
                      width: 100%;
                      margin-bottom: 10px;
                    "
                  >
                    <tr>
                      <td>Terbilang</td>
                      <td>: {{ dataReport.Terbilang }}</td>
                      <td>DPP :</td>
                      <td style="text-align: right">
                        {{
                          parseFloat(dataReport.DPP).toLocaleString(undefined)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>PPn :</td>
                      <td style="text-align: right">
                        {{
                          parseFloat(dataReport.PPn).toLocaleString(undefined)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>Keterangan</td>
                      <td>: {{ dataReport.Keterangan }}</td>
                      <td>Grand Total</td>
                      <td style="text-align: right">
                        {{
                          parseFloat(dataReport.TotalBayar).toLocaleString(
                            undefined
                          )
                        }}
                      </td>
                    </tr>
                  </table>
                  <!-- footer -->
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
    this.dataReport.NomorWO = this.$route.params.data.NomorWO;
    // console.log(this.$route.params.data.NomorWO)
    this.dataReport.NoPO = this.$route.params.data.NoPO;
    this.dataReport.NoRangka = this.$route.params.data.wo.NomorRangka;
    this.dataReport.NoMesin = this.$route.params.data.wo.NomorMesin;
    this.dataReport.Pemilik = this.$route.params.data.wo.pemilik.Nama;
    this.dataReport.Kendaraan = this.$route.params.data.wo.NomorPolisi;
    this.dataReport.Tahun = this.$route.params.data.wo.rangka.Tahun;
    this.dataReport.Tipe =
      this.$route.params.data.wo.rangka.kendaraan.Merk +
      " " +
      this.$route.params.data.wo.rangka.kendaraan.Nama;
    this.dataReport.items = this.$route.params.data.items;
    this.dataReport.Total = this.$route.params.data.DPP;
    this.dataReport.TotalBayar = this.$route.params.data.TotalBayar;
    this.dataReport.PPn = this.$route.params.data.PPn;
    this.dataReport.DPP = this.$route.params.data.DPP;
    this.dataReport.Terbilang =
      angkaTerbilang(parseFloat(this.dataReport.TotalBayar)).toUpperCase() +
      " RUPIAH";
    this.dataReport.KodeNota = this.$route.params.data.KodeNota;
    this.dataReport.Keterangan = this.$route.params.data.Keterangan;
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
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
  },
};
</script>

<style scoped>
.header-kiri {
  font-weight: bold;
}
table {
  width: 100%;
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

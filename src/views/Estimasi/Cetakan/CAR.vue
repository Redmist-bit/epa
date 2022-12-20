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
        <table>
          <tr>
            <td>No</td>
            <td style="font-weight: bold">: {{ dataReport.KodeNota }}</td>
            <td
              rowspan="3"
              style="
                font-weight: bold;
                vertical-align: text-top;
                text-align: right;
              "
            >
              Samarinda, {{ dataReport.Tanggal }}
            </td>
          </tr>
          <tr>
            <td>Lampiran</td>
            <td style="font-weight: bold">: -</td>
          </tr>
          <tr>
            <td>Perihal</td>
            <td style="font-weight: bold">: Estimasi Biaya Perbaikan</td>
          </tr>
        </table>
        <p style="margin-top: 10px">Kepada</p>
        <h4 style="margin-bottom: 25px">Yth. {{ dataReport.Pelanggan }}</h4>
        <p>Dengan Hormat,</p>
        <p>
          Sesuai dengan perihal diatas bersama ini kami ajukan penawaran biaya
          perbaikan untuk kendaraan:
        </p>
        <!-- info customer -->
        <table>
          <tr>
            <td>1.</td>
            <td style="width: 25%">Nama</td>
            <td style="font-weight: bold">: {{ dataReport.Pemilik }}</td>
          </tr>
          <tr>
            <td>2.</td>
            <td style="width: 25%">Merk / Tipe Kendaraan</td>
            <td style="font-weight: bold">: {{ dataReport.TipeKendaraan }}</td>
          </tr>
          <tr>
            <td>3.</td>
            <td style="width: 25%">Warna</td>
            <td style="font-weight: bold">: {{ dataReport.Warna }}</td>
          </tr>
          <tr>
            <td>4.</td>
            <td style="width: 25%">Nomor Polisi</td>
            <td style="font-weight: bold">: {{ dataReport.NomorPolisi }}</td>
          </tr>
          <tr>
            <td>5.</td>
            <td style="width: 25%">Odometer</td>
            <td style="font-weight: bold">: {{ dataReport.Odometer }}</td>
          </tr>
          <tr>
            <td>6.</td>
            <td style="width: 25%">Tahun Pembuatan</td>
            <td style="font-weight: bold">: {{ dataReport.Tahun }}</td>
          </tr>
          <tr>
            <td>7.</td>
            <td style="width: 25%">No. Rangka</td>
            <td style="font-weight: bold">: {{ dataReport.NomorRangka }}</td>
          </tr>
          <tr>
            <td>8.</td>
            <td style="width: 25%">No. Mesin</td>
            <td style="font-weight: bold">: {{ dataReport.NomorMesin }}</td>
          </tr>
          <tr>
            <td>9.</td>
            <td style="width: 25%">No. Polis Asuransi</td>
            <td style="font-weight: bold">
              : {{ dataReport.NoPolisAsuransi }}
            </td>
          </tr>
        </table>
        <p style="margin-bottom: 10px">
          Dengan perincian biaya sebagai berikut :
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <div class="page">
                  <!-- head PEKERJAAN  -->
                  <table>
                    <thead>
                      <tr>
                        <th style="width: 5%">No.</th>
                        <th style="width: 50%">Keterangan</th>
                        <th style="width: 10%">Jumlah</th>
                        <th style="width: 35%">Total Harga & Diskon</th>
                      </tr>
                      <!-- <tr>
                                                <th colspan="4" style="text-align:left">PEKERJAAN PERBAIKAN</th>
                                            </tr> -->
                    </thead>
                  </table>
                  <table>
                    <tbody>
                      <!-- isi -->
                      <div v-if="dataReport.pekerjaan.Evakuasi.length > 0">
                        <table style="margin-top: 5px">
                          <tr>
                            <td
                              style="font-weight: bold; border: 1px solid black"
                            >
                              EVAKUASI, MOBILISASI & PENGAWALAN
                            </td>
                          </tr>
                        </table>
                        <table style="margin-top: 5px">
                          <tr
                            v-for="(item, index) in dataReport.pekerjaan
                              .Evakuasi"
                            :key="index"
                          >
                            <td
                              style="
                                border: 1px solid black;
                                width: 5%;
                                text-align: center;
                              "
                            >
                              {{ index + 1 }}
                            </td>
                            <td style="border: 1px solid black; width: 33%">
                              {{ item.kerja.Nama }}
                            </td>
                            <td style="border: 1px solid black; width: 17%">
                              {{ item.Keterangan }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: center;
                                width: 10%;
                              "
                            >
                              {{ item.Jumlah }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 18%;
                              "
                            >
                              {{
                                parseFloat(item.Harga).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                ) +
                                " (" +
                                item.Diskon1 +
                                ")"
                              }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 17%;
                              "
                            >
                              {{
                                item.SubTotal.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="4"
                            >
                              TOTAL EVAKUASI, MOBILISASI & PENGAWALAN
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="2"
                            >
                              {{
                                dataReport.pekerjaan.Evakuasi.reduce(
                                  (a, b) => a + parseFloat(b.SubTotal),
                                  0
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div v-if="dataReport.pekerjaan.Material.length > 0">
                        <table style="margin-top: 5px">
                          <tr>
                            <td
                              style="font-weight: bold; border: 1px solid black"
                            >
                              MATERIAL
                            </td>
                          </tr>
                        </table>
                        <table style="margin-top: 5px">
                          <tr
                            v-for="(item, index) in dataReport.pekerjaan
                              .Material"
                            :key="index"
                          >
                            <td
                              style="
                                border: 1px solid black;
                                width: 5%;
                                text-align: center;
                              "
                            >
                              {{ index + 1 }}
                            </td>
                            <td style="border: 1px solid black; width: 33%">
                              {{ item.kerja.Nama }}
                            </td>
                            <td style="border: 1px solid black; width: 17%">
                              {{ item.Keterangan }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: center;
                                width: 10%;
                              "
                            >
                              {{ item.Jumlah }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 18%;
                              "
                            >
                              {{
                                parseFloat(item.Harga).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                ) +
                                " (" +
                                item.Diskon1 +
                                ")"
                              }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 17%;
                              "
                            >
                              {{
                                item.SubTotal.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="4"
                            >
                              TOTAL MATERIAL
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="2"
                            >
                              {{
                                dataReport.pekerjaan.Material.reduce(
                                  (a, b) => a + parseFloat(b.SubTotal),
                                  0
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div v-if="dataReport.pekerjaan.Perbaikan.length > 0">
                        <table style="margin-top: 5px">
                          <tr>
                            <td
                              style="font-weight: bold; border: 1px solid black"
                            >
                              PEKERJAAN PERBAIKAN
                            </td>
                          </tr>
                        </table>
                        <table style="margin-top: 5px">
                          <tr
                            v-for="(item, index) in dataReport.pekerjaan
                              .Perbaikan"
                            :key="index"
                          >
                            <td
                              style="
                                border: 1px solid black;
                                width: 5%;
                                text-align: center;
                              "
                            >
                              {{ index + 1 }}
                            </td>
                            <td style="border: 1px solid black; width: 33%">
                              {{ item.kerja.Nama }}
                            </td>
                            <td style="border: 1px solid black; width: 17%">
                              {{ item.Keterangan }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: center;
                                width: 10%;
                              "
                            >
                              {{ item.Jumlah }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 18%;
                              "
                            >
                              {{
                                parseFloat(item.Harga).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                ) +
                                " (" +
                                item.Diskon1 +
                                ")"
                              }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 17%;
                              "
                            >
                              {{
                                item.SubTotal.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="4"
                            >
                              TOTAL PEKERJAAN PERBAIKAN
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="2"
                            >
                              {{
                                dataReport.pekerjaan.Perbaikan.reduce(
                                  (a, b) => a + parseFloat(b.SubTotal),
                                  0
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div v-if="dataReport.pekerjaan.Transportasi.length > 0">
                        <table style="margin-top: 5px">
                          <tr>
                            <td
                              style="font-weight: bold; border: 1px solid black"
                            >
                              TRANSPORTASI & AKOMODASI
                            </td>
                          </tr>
                        </table>
                        <table style="margin-top: 5px">
                          <tr
                            v-for="(item, index) in dataReport.pekerjaan
                              .Transportasi"
                            :key="index"
                          >
                            <td
                              style="
                                border: 1px solid black;
                                width: 5%;
                                text-align: center;
                              "
                            >
                              {{ index + 1 }}
                            </td>
                            <td style="border: 1px solid black; width: 33%">
                              {{ item.kerja.Nama }}
                            </td>
                            <td style="border: 1px solid black; width: 17%">
                              {{ item.Keterangan }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: center;
                                width: 10%;
                              "
                            >
                              {{ item.Jumlah }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 18%;
                              "
                            >
                              {{
                                parseFloat(item.Harga).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                ) +
                                " (" +
                                item.Diskon1 +
                                ")"
                              }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 17%;
                              "
                            >
                              {{
                                item.SubTotal.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="4"
                            >
                              TOTAL TRANSPORTASI & AKOMODASI
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="2"
                            >
                              {{
                                dataReport.pekerjaan.Transportasi.reduce(
                                  (a, b) => a + parseFloat(b.SubTotal),
                                  0
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div v-if="dataReport.Part.length > 0">
                        <table style="margin-top: 5px">
                          <tr>
                            <td
                              style="font-weight: bold; border: 1px solid black"
                            >
                              PENGGANTIAN SPARE PARTS
                            </td>
                          </tr>
                        </table>
                        <table style="margin-top: 5px">
                          <tr
                            v-for="(item, index) in dataReport.Part"
                            :key="index"
                          >
                            <td
                              style="
                                border: 1px solid black;
                                width: 5%;
                                text-align: center;
                              "
                            >
                              {{ index + 1 }}
                            </td>
                            <td style="border: 1px solid black; width: 33%">
                              {{ item.barang.Nama }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                width: 17%;
                                text-align: center;
                              "
                            >
                              {{ item.barang.PartNumber1 }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: center;
                                width: 10%;
                              "
                            >
                              {{ item.Jumlah }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 18%;
                              "
                            >
                              {{
                                parseFloat(item.Harga).toLocaleString(
                                  undefined,
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                ) +
                                " (" +
                                item.Diskon1 +
                                ")"
                              }}
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                width: 17%;
                              "
                            >
                              {{
                                item.SubTotal.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="4"
                            >
                              TOTAL PENGGANTIAN SPARE PARTS
                            </td>
                            <td
                              style="
                                border: 1px solid black;
                                text-align: right;
                                font-weight: bold;
                              "
                              colspan="2"
                            >
                              {{
                                dataReport.Part.reduce(
                                  (a, b) => a + parseFloat(b.SubTotal),
                                  0
                                ).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              }}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </tbody>
                  </table>
                  <table style="margin-top: 10px">
                    <tr>
                      <td
                        style="
                          border: 1px solid black;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        SUBTOTAL
                      </td>
                      <td
                        style="
                          border: 1px solid black;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        {{
                          parseFloat(dataReport.SubTotal).toLocaleString(
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
                      <td
                        style="
                          border: 1px solid black;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        PPN {{ dataReport.PPnPersen }}%
                      </td>
                      <td
                        style="
                          border: 1px solid black;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        {{
                          parseFloat(dataReport.PPn).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          border: 1px solid black;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        TOTAL PERBAIKAN
                      </td>
                      <td
                        style="
                          border: 1px solid black;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        {{
                          parseFloat(dataReport.TotalBayar).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )
                        }}
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <p style="font-size: 14px; padding-left: 3px; margin-bottom: 30px">
              Keterangan : {{ dataReport.Keterangan }}
            </p>
            <p style="font-weight: bold">
              Demikian estimasi biaya perbaikan kendaraan ini kami sampaikan
              atas perhatian dan kerjasamanya, diucapkan terima kasih.
            </p>
            <div style="display: inline-block; margin-top: 10px">
              <p style="font-weight: bold; margin-bottom: 40px">Hormat Kami,</p>
              <p style="font-weight: bold; text-decoration: underline">
                MOH. SODIK
              </p>
              <p style="font-weight: bold">MANAGER OF CAR</p>
            </div>
          </tfoot>
        </table>
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
    this.dataReport.Tanggal =
      this.$route.params.data.Tanggal.substring(8, 10) +
      " " +
      mounth +
      " " +
      this.$route.params.data.Tanggal.substring(0, 4);
    this.dataReport.pekerjaan = {
      Evakuasi: this.$route.params.data.pekerjaan
        .filter(
          (m) => m.kerja.GrupPekerjaan == "EVAKUASI, MOBILISASI & PENGAWALAN"
        )
        .map((p) => {
          p.SubTotal = parseFloat(p.SubTotal) - parseFloat(p.SubDiskon);
          return p;
        }),
      Material: this.$route.params.data.pekerjaan
        .filter((m) => m.kerja.GrupPekerjaan == "MATERIAL")
        .map((p) => {
          p.SubTotal = parseFloat(p.SubTotal) - parseFloat(p.SubDiskon);
          return p;
        }),
      Perbaikan: this.$route.params.data.pekerjaan
        .filter((m) => m.kerja.GrupPekerjaan == "PEKERJAAN PERBAIKAN")
        .map((p) => {
          p.SubTotal = parseFloat(p.SubTotal) - parseFloat(p.SubDiskon);
          return p;
        }),
      Transportasi: this.$route.params.data.pekerjaan
        .filter((m) => m.kerja.GrupPekerjaan == "TRANSPORTASI & AKOMODASI")
        .map((p) => {
          p.SubTotal = parseFloat(p.SubTotal) - parseFloat(p.SubDiskon);
          return p;
        }),
    };
    this.dataReport.Part = this.$route.params.data.barang.map((b) => {
      b.SubTotal = parseFloat(b.SubTotal) - parseFloat(b.SubDiskon);
      return b;
    });
    this.dataReport.SubTotal = this.$route.params.data.DPP;
    this.dataReport.PPn = this.$route.params.data.PPn;
    this.dataReport.TotalBayar = this.$route.params.data.TotalBayar;
    this.dataReport.Keterangan = this.$route.params.data.Keterangan;
    this.dataReport.Pemilik = this.$route.params.data.wo.pemilik.Nama;
    this.dataReport.Pelanggan = this.$route.params.data.pelanggan.Nama;
    this.dataReport.Warna = this.$route.params.data.rangka.Warna;
    this.dataReport.Tahun = this.$route.params.data.rangka.Tahun;
    this.dataReport.NomorPolisi = this.$route.params.data.NomorPolisi;
    this.dataReport.NomorRangka = this.$route.params.data.NomorRangka;
    this.dataReport.NomorMesin = this.$route.params.data.NomorMesin;
    this.dataReport.Odometer = this.$route.params.data.Odometer;
    this.dataReport.NoPolisAsuransi =
      this.$route.params.data.wo.NoPolisAsuransi;
    this.dataReport.TipeKendaraan =
      this.$route.params.data.rangka.kendaraan.Merk +
      " " +
      this.$route.params.data.rangka.kendaraan.Nama;
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
    // console.log(JSON.parse(localStorage.getItem('info')).Email)
  },
  methods: {
    countCetak(id, token) {
      api
        .put("countCetakan/" + id + "?token=" + token, { modul: "ESTIMASI" })
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
  padding: 0%;
}
.col-12 {
  margin: 0%;
  padding: 0%;
}
.col-sm-8 .col-sm-4 {
  margin: 0%;
  padding: 0%;
}
.col-sm-8 {
  font-weight: bold;
}
p {
  margin: 0%;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-family: calibri;
}
thead th {
  border: 1px solid black;
}
p {
  font-family: calibri;
  margin: 0%;
}
tbody div {
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

<template>
    <v-card>
        <v-btn color="success" @click="print">
            <v-icon>mdi-printer</v-icon>
        </v-btn>
        <v-sheet outlined width="21cm" height="auto" class="ma-8 mx-auto elevation-15">
            <div id="printing" style="padding: 35px; width: 21cm; height: auto; margin: auto;">
                <!-- head -->
                <v-row>
                    <v-col>
                        <p>PT TRINITY AUTO</p>
                        <p>{{dataReport.AlamatLengkap}} Samarinda</p>
                        <p>Telp/Fax : {{dataReport.Telp}}</p>
                        <p>Email : {{dataReport.EmailPerusahaan}}</p>
                    </v-col>
                    <v-col>
                        <h3 style="margin-top:10px;">Payment Voucher</h3>
                        <p style="text-align:center; margin-right:-37px;">KodeNota : {{dataReport.KodeNota}}</p>
                        <p style="text-align:center; margin-right:-37px;">Tanggal : {{dataReport.Tanggal}}</p>
                    </v-col>
                </v-row>
                <hr>
                <hr>
                <table style="margin-top:10px;">
                    <tbody>
                        <tr>
                            <td>
                                <div class="page">
                                    <table class="isi" style="border-collapse:collapse;">
                                        <thead>
                                            <tr>
                                                <th style="width:3%;">No</th>
                                                <th style="width:10%;">Perkiraan</th>
                                                <th style="width:8%;">Lokasi</th>
                                                <th style="width:22%;">Nomor WO</th>
                                                <th style="width:37%;">Keterangan</th>
                                                <th style="width:20%;">Jumlah</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item,index) in dataReport.items" :key="index">
                                                <td style="text-align:center;">{{index+1}}</td>
                                                <td>{{item.Perkiraan}}</td>
                                                <td>{{item.Lokasi}}</td>
                                                <td>{{item.NomorWO}}</td>
                                                <td>{{item.Keterangan}}</td>
                                                <td style="text-align:right;">{{parseFloat(item.Jumlah).toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2})}}</td>
                                            </tr>
                                            <!-- <tr>
                                                <td style="text-align:center;">2</td>
                                                <td>5110301</td>
                                                <td>HO</td>
                                                <td>0101/WO/2109/000001</td>
                                                <td>PEMAKAIAN BBM 67 LITER | UNTUK MESIN LAS DONGFENG DAN YANMAR |</td>
                                                <td style="text-align:right;">569.500,00</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center;">3</td>
                                                <td>5110301</td>
                                                <td>HO</td>
                                                <td>0101/WO/2106/000233</td>
                                                <td>PEMAKAIAN BBM 40 LITER | UNTUK WASHING KOMPONEN UNIT DI SITE LONG BAGUN</td>
                                                <td style="text-align:right;">340.000,00</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center;">4</td>
                                                <td>5110301</td>
                                                <td>HO</td>
                                                <td>0101/WO/2109/000001</td>
                                                <td>PEMAKAIAN BBM 55 LITER | UNTUK MESIN GENSET TA2 DAN MESS TA3</td>
                                                <td style="text-align:right;">467.500,00</td>
                                            </tr> -->
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <v-row>
                        <v-col>
                            <p>Keterangan : {{dataReport.Keterangan}}</p>
                        </v-col>
                        <v-col>
                            <p style="text-align:right;">Total: {{parseFloat(dataReport.total).toLocaleString(undefined,{ minimumFractionDigits: 2, maximumFractionDigits: 2})}}</p>
                        </v-col>
                    </v-row>
                    <tfoot>
                        <tr>
                            <td>
                                <div class="footer">
                                    <table>
                                        <tr>
                                            <td style="width:20%; border-bottom:none; border-top:1px solid black; border-right:1px solid black; border-left:1px solid black;">Leader,</td>
                                            <td style="width:20%; border-bottom:none; border-top:1px solid black; border-right:1px solid black; border-left:1px solid black;">Menyetujui,</td>
                                            <td style="width:20%; border-bottom:none; border-top:1px solid black; border-right:1px solid black; border-left:1px solid black;">Finance,</td>
                                            <td style="width:20%; border-bottom:none; border-top:1px solid black; border-right:1px solid black; border-left:1px solid black;">Kasir,</td>
                                            <td style="width:20%; border-bottom:none; border-top:1px solid black; border-right:1px solid black; border-left:1px solid black;">Penerima,</td>
                                        </tr>
                                        <tr>
                                            <td style="border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black;" height="40">&nbsp;</td>
                                            <td style="border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black;" height="40">&nbsp;</td>
                                            <td style="border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black;" height="40">&nbsp;</td>
                                            <td style="border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black;" height="40">&nbsp;</td>
                                            <td style="border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black;" height="40">&nbsp;</td>
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
import angkaTerbilang from '@develoka/angka-terbilang-js';
import api from '@/services/http'
export default {
    data(){
        return {
            id:'',
            token:localStorage.getItem('token'),
            dataReport:{}
        }
    },
    mounted(){
        this.id = this.$route.params.data.id
    },
    created(){
        var mounth = this.$route.params.data.Tanggal.substring(5,7)
        switch (mounth) {
            case '01':
                mounth = "Januari"
                break;
            case '02':
                mounth = "Februari"
                break;
            case '03':
                mounth = "Maret"
                break;
            case '04':
                mounth = "April"
                break;
            case '05':
                mounth = "Mei"
                break;
            case '06':
                mounth = "Juni"
                break;
            case '07':
                mounth = "Juli"
                break;
            case '08':
                mounth = "Agustus"
                break;
            case '09':
                mounth = "September"
                break;
            case '10':
                mounth = "Oktober"
                break;
            case '11':
                mounth = "November"
                break;
            case '12':
                mounth = "Desember"
                break;
        }
        this.dataReport.KodeNota = this.$route.params.data.KodeNota
        this.dataReport.Keterangan = this.$route.params.data.Keterangan
        this.dataReport.Tanggal = this.$route.params.data.Tanggal.substring(8,10)+' '+mounth+' '+this.$route.params.data.Tanggal.substring(0,4)
        this.dataReport.total = this.$route.params.data.Total
        this.dataReport.items = this.$route.params.data.detail.map(p => {
            p.Perkiraan = p.Perkiraan.substr(5)
            return p
        })
        this.dataReport.Terbilang = angkaTerbilang(parseFloat(this.dataReport.total)).toUpperCase() + ' RUPIAH'
        this.dataReport.EmailPerusahaan = JSON.parse(localStorage.getItem('info')).Email
        this.dataReport.Telp = JSON.parse(localStorage.getItem('info')).Telepon + ' / ' + JSON.parse(localStorage.getItem('info')).Fax
        this.dataReport.AlamatLengkap = JSON.parse(localStorage.getItem('info')).Alamat 
    },
    methods:{
        countCetak(id,token){
            api.put("countCetakan/"+id+'?token='+token,{modul:"PV"})
            .then((res)=>{
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        },
        print(){
            // Get HTML to print from element
            const prtHtml = document.getElementById('printing').innerHTML;

            // Get all stylesheets HTML
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML
            }

            // Open the print window
            const WinPrint = window.open('', '', "width="+screen.availWidth+",height="+screen.availHeight,'left=0,top=0,toolbar=0,scrollbars=0,status=0');
            WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${prtHtml}
            </body>
            </html>`);
            WinPrint.onafterprint = this.countCetak(this.id,this.token)
            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            WinPrint.close();
        }
    }
}
</script>

<style scoped>
    .col{
        margin-bottom: 20px;
    }
    .col p{
        font-weight: bold;
        margin: 0%;
    }
    .col h3{
        text-align: right;
    }
    hr{
        border-bottom: 1px dashed black;
    }
    p{
        font-family: calibri;
    }
    table{
        width: 100%;
        border-collapse: collapse;
        font-family: calibri;
    }
    .isi th{
        border:1px solid black;
        font-size:14px;
    }
    .isi td{
        border:1px solid black;
        font-size:14px;
    }
    @media print {
        .header {
        position: fixed;
        height:100px;
        top: 0;
        }
        thead {display: table-header-group;} 
        tfoot {display: table-footer-group;}
        .footer {
        position: relative;
        bottom: 0;
        }
        @page {
            margin: 20mm
        }
        .page {
            page-break-after: always;
        }
    }
</style>
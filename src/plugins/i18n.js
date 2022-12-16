import Vue from "vue";
import VueI18n from "vue-i18n";
import api from "../services/http";

Vue.use(VueI18n);

// let messages = {
//     id: {
//         Gudang: {
//             MainTitle: 'Gudang',
//             BtnTambah: 'Tambah',
//             DialogTitleTambah: 'Tambah Gudang',
//             DialogTitleEdit: 'Ubah Gudang',
//             DialogBatalTambah: 'Batal Tambah ?',
//             DialogBatalEdit: 'Batal Ubah ?',
//         },
//         Supplier: {
//             MainTitle: 'Pemasok',
//             BtnTambah: 'Tambah',
//             DialogTitleTambah: 'Tambah Pemasok',
//             DialogTitleEdit: 'Ubah Pemasok',
//             DialogBatalTambah: 'Batal Tambah ?',
//             DialogBatalEdit: 'Batal Ubah ?',
//         },
//         Pelanggan: {
//             MainTitle: 'Pelanggan',
//             BtnTambah: 'Tambah',
//             DialogTitleTambah: 'Tambah Pelanggan',
//             DialogTitleEdit: 'Ubah Pelanggan',
//             DialogBatalTambah: 'Batal Tambah ?',
//             DialogBatalEdit: 'Batal Ubah ?',
//         }
//     },
//     en: {
//         Gudang: {
//             MainTitle: 'Warehouse',
//             BtnTambah: 'Add',
//             DialogTitleTambah: 'Add Gudang',
//             DialogTitleEdit: 'Edit Gudang',
//             DialogBatalTambah: 'Cancel ?',
//             DialogBatalEdit: 'Cancel Change?',
//         },
//         Supplier: {
//             MainTitle: 'Supplier',
//             BtnTambah: 'Add',
//             DialogTitleTambah: 'Add Supplier',
//             DialogTitleEdit: 'Edit Supplier',
//             DialogBatalTambah: 'Cancel ?',
//             DialogBatalEdit: 'Cancel Change?',
//         },
//         Pelanggan: {
//             MainTitle: 'Customer',
//             BtnTambah: 'Add',
//             DialogTitleTambah: 'Add Customer',
//             DialogTitleEdit: 'Edit Customer',
//             DialogBatalTambah: 'Cancel ?',
//             DialogBatalEdit: 'Cancel Change?',
//         }
//     }
// };

const i18n = new VueI18n({
  locale: "id", // set locale
  // fallbackLocale: 'en', // set fallback locale
  // messages, // set locale messages
});

new Vue({
  i18n,
  beforeCreate() {
    const vm = this;
    api.get("/bahasa/id").then((response) => {
      function Translate(nama) {
        return (data[nama] = response.data.find(
          ({ komponen }) => komponen === nama
        ));
      }
      let data = new Array();
      for (let index = 0; index < response.data.length; index++) {
        Translate(response.data[index].komponen);
      }
      //tambahkan translate

      // Translate('Gudang')
      // Translate('Pelanggan')
      // Translate('Supplier')
      // Translate('Mekanik')
      // Translate('Kendaraan')
      // Translate('Login')
      // Translate('User')
      // Translate('Barang')
      // Translate('Periode')
      //**

      Object.entries(data).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});
      vm.$i18n.setLocaleMessage("id", data);
      // console.log('wowo',vm.$i18n)
    });
    api.get("/bahasa/en").then((response) => {
      function Translate(nama) {
        return (data[nama] = response.data.find(
          ({ komponen }) => komponen === nama
        ));
      }
      let data = new Array();
      for (let index = 0; index < response.data.length; index++) {
        Translate(response.data[index].komponen);
      }
      // Translate('Gudang')
      // Translate('Pelanggan')
      // Translate('Supplier')
      // Translate('Mekanik')
      // Translate('Kendaraan')
      // Translate('Login')
      // Translate('User')
      // Translate('Barang')
      // Translate('Periode')
      Object.entries(data).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});
      vm.$i18n.setLocaleMessage("en", data);
      // console.log('wowo',vm.$i18n)
    });
  },
});
export default i18n;

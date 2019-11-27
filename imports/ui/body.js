import { Template } from 'meteor/templating';
import { Agenda } from '../api/agenda.js';
import './body.html';

Template.body.helpers({
  agenda() {
    return Agenda.find({}, { sort: { tgl: -1 } });    
  }
});

Template.body.events({
  'keypress .form-text'(event) {
    // event.preventDefault();
    // console.log(event);
    const enterKey = event.key == "Enter";
    // console.log(enterKey);
    if (enterKey) {
      // ambil objek form
      const form = $('.form-kegiatan');
      
      // ambil nilai form
      const kegiatan = form.find('[name="nama_kegiatan"]');
      const tgl = form.find('[name="tgl_kegiatan"]');
      const lokasi = form.find('[name="lokasi_kegiatan"]');
      const _id = form.find('[name="_id"]');
      
      if (!kegiatan.val() || !tgl.val() || !lokasi.val()) {
        return false;
      }

      // console.log(form);
      
      if (_id.val().trim() != '') {
        // masukkan ke database
        Agenda.update(
          {_id: _id.val()},
          { kegiatan: kegiatan.val(),
          tgl: tgl.val(),
          lokasi: lokasi.val(),
        });
      } else {
        // masukkan ke database
        Agenda.insert({
          kegiatan: kegiatan.val(),
          tgl: tgl.val(),
          lokasi: lokasi.val(),
          tgl_input: new Date(),
        });
      }

      // reset nilai form
      kegiatan.val('');
      tgl.val('');
      lokasi.val('');
      _id.val('');
    }
  }
});

Template.data.events({
  'click .delete'(event) {
    const confirmDelete = confirm('Yakin akan menghapus data ini?');
    if (confirmDelete) {
      Agenda.remove(this._id);
    }
  },
  'click .edit-button'(event) {
    const updateData = Agenda.findOne({_id: this._id});
    // console.log(updateData);
    const form = $('.form-kegiatan');
    const kegiatan = form.find('[name="nama_kegiatan"]');
    const tgl = form.find('[name="tgl_kegiatan"]');
    const lokasi = form.find('[name="lokasi_kegiatan"]');
    const _id = form.find('[name="_id"]');
    kegiatan.val(updateData.kegiatan);
    tgl.val(updateData.tgl);
    lokasi.val(updateData.lokasi);
    _id.val(this._id);
  }
});
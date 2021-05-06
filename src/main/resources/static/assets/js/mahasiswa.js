var tableBiodata = {
  create: function () {
    // jika table tersebut datatable, maka clear and dostroy
    if ($.fn.DataTable.isDataTable('#tableBiodata')) {
      //table yg sudah dibentuk menjadi datatable harus d rebuild lagi untuk di instantiasi ulang
      $('#tableBiodata').DataTable().clear();
      $('#tableBiodata').DataTable().destroy();
    }

    $.ajax({
      url: '/api/mahasiswa',
      method: 'get',
      contentType: 'application/json',
      success: function (res, status, xhr) {
        if (xhr.status == 200 || xhr.status == 201) {
          $('#tableBiodata').DataTable({
            data: res,
            columns: [
              {
                title: "Nama Mahasiswa",
                data: "namaMahasiswa"
              },
              {
                title: "Alamat",
                data: "alamat"
              },
              {
                title: "Agama",
                data: "deskripsiAgama"
              },
              {
                title: "Jurusan",
                data: "namaJurusan"
              },
              {
                title: "Action",
                data: null,
                render: function (data, type, row) {
                  return "<button class='btn-success' onclick=formBiodata.setEditData('" + data.id + "') style='border-radius: 20%'><i class='fa fa-pensil-alt'></i> Edit</button>" +
                    "<button class='btn-danger' onclick=actionDelete.deleteConfirm('" + data.id + "') style='border-radius: 20%' >Delete</button>"
                }
              }
            ]
          });

        } else {

        }
      },
      error: function (err) {
        console.log(err);
      }
    });


  }
};

var formBiodata = {
  resetForm: function () {
    $('#form-biodata')[0].reset();
    $('#id').val("");
    $('#idAgama').val("");
    $('#idJurusan').val("")
  },
  saveForm: function () {
    if ($('#form-biodata').parsley().validate()) {
      var dataResult = getJsonForm($("#form-biodata").serializeArray(), true);

      $.ajax({
        url: '/api/mahasiswa',
        method: 'post',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(dataResult),
        success: function (res, status, xhr) {
          if (xhr.status == 200 || xhr.status == 201) {
            tableBiodata.create();
            $('#modal-biodata').modal('hide')

          } else {

          }
        },
        erorrr: function (err) {
          console.log(err);
        }
      });
    }
  },
  setEditData: function (idCabang) {
    formBiodata.resetForm();

    $.ajax({
      url: '/api/mahasiswa/' + idCabang,
      method: 'get',
      contentType: 'application/json',
      dataType: 'json',
      success: function (res, status, xhr) {
        if (xhr.status == 200 || xhr.status == 201) {
          $('#form-biodata').fromJSON(JSON.stringify(res));
          $('#modal-biodata').modal('show')

        } else {

        }
      },
      erorrr: function (err) {
        console.log(err);
      }
    });


  }

};

var actionDelete = {
  deleteConfirm: function (idCabang) {
    $.ajax({
      url: '/api/mahasiswa/' + idCabang,
      method: 'get',
      contentType: 'application/json',
      dataType: 'json',
      success: function (res, status, xhr) {
        if (xhr.status == 200 || xhr.status == 201) {
          $('#form-biodata').fromJSON(JSON.stringify(res));
          $('#modal-delete').modal('show')

        } else {

        }
      },
      erorrr: function (err) {
        console.log(err);
      }
    });

  },
  deleteRowData: function () {
    if ($('#form-biodata').parsley().validate()) {
      var dataResult = getJsonForm($("#form-biodata").serializeArray(), true);

      $.ajax({
        url: '/api/mahasiswa/' + dataResult.id,
        method: 'delete',
        // contentType: 'application/json',
        // dataType: 'json',
        // data: JSON.stringify(dataResult),
        success: function () {
          tableBiodata.create();
          $('#modal-delete').modal('hide')
        },
        erorrr: function (err) {
          console.log(err);
        }
      });
    }
  }
};

var dropdown = {
  pilihAgama: function () {
    $.ajax({
      method: 'get',
      url: "/api/agama",
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        var j = '<option value="-1">Pilih Agama</option>';
        // console.log(xhr.status)
        // if(xhr.status == 200 || xhr.status == 201){
          for (var i = 0; i < data.length; i++) {
            j +=  '<option value="' + data[i].id + '">' + data[i].deskripsiAgama + '</option>';
          }
          $('#deskripsiAgama').append(j);
        // } else {
        // }
      },
      erorrr: function (err) {
        console.log(err);
      }
    });
  },
  pilihJurusan: function () {
    $.ajax({
      type: 'get',
      url: "/api/jurusan",
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        var s = '<option value="-1">Pilih Jurusan</option>';
        // console.log(xhr.status)
        // if(xhr.status == 200 || xhr.status == 201){
          for (var i = 0; i < data.length; i++) {
            s +=  '<option value="' + data[i].id + '">' + data[i].namaJurusan + '</option>';
          }
          $('#namaJurusan').append(s);
        // } else {
        // }
      },
      erorrr: function (err) {
        console.log(err);
      }
    });
  },
}


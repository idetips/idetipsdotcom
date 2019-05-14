
// variable data penampung
var ttlnum = 0;
var ttlarr = [];
var ttlhash = [];
var ttllok = [];
var html = "";

function getAndSet() {
    
    //kita ambil data untuk lis tabel kontenya dari berapa banyak jumblah tag H2
    $('.content-article h2').each(function () {
        ttlnum++

        //membuat id dengan kombinasi nilai string "title" + numerik++
        $(this).attr('id', 'title-' + ttlnum);

        // data di push atau dimasukan ke array
        ttlarr.push($(this).text());
        ttlhash.push($(this).attr('id'))
    });

    //kita set datanya dengan menjalankan looping
    for (var i = 0; i < ttlarr.length; i++) {
        html += "<li data-id='" + ttlhash[i] + "'><a href='#" + ttlhash[i] + "'>" + ttlarr[i] + "</a></li>";
        
        //mengambil nilai offset top dan memasukan datanya ke array untuk dipakai di fungsi activeCurrentTable
        hash_offset_top = $("#" + ttlhash[i]).offset().top
        ttllok.push(hash_offset_top)
    }

    //html di appending juga untuk list pertama tag a diberi class active
    $('#table-show').append(html);
    $('#table-show li:first-child a').addClass('active')
}

function smoothScroll() {

    // smooth scrolling ini diambil dari w3school dengan sedikit modifikasi
    // ketika di klik tag a / linknya maka mencari link dengan hash sesuai judul tadi
    $("#table-show a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            $(this).addClass('active').parents().siblings().find('a').removeClass('active');
            var hash = this.hash;

            //layar akan melakukan scrolling dengan animasi, saya menggunakan animate karena di firefox offset().top tidak kompatibel
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 300, function () {
                window.location.hash = hash;
            });
        }
    });
}

function activeCurrentTable() {
    //ketika layar discroll maka list table content akan berpindah yang aktifnya sesuai lokasi judul
    $(window).on('scroll', function () {
        for (var i = 0; i < ttllok.length; i++) {
            if ($(window).scrollTop() >= ttllok[i]) {
                $('[data-id="' + ttlhash[i] + '"]').find('a').addClass('active').parents().siblings().find('a').removeClass('active')
            }
        }
    })
}

//semua fungsi dipanggil saat document ready / sudah diload semua
$(document).ready(function () {
    getAndSet()
    smoothScroll()
    activeCurrentTable()
})

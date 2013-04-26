function zeroPad(e, t) {
  var n = t + "", r = e - n.length;
  for (var i = 0; i < r; i++) n = "0" + n;
  return n;
}

$(document).ready(function() {
  function e() {
    for (var e = 1; e <= 12; e++) $("#hour").append('<option value="' + e + '">' + e + "</option>");
    for (var t = 0; t <= 55; t += 5) $("#minute").append('<option value="' + t + '">' + zeroPad(2, t) + "</option>");
    $("#content").show();
  }
  function t(e, t, n) {
    var r = 0, i = 0, s = n;
    if (t < 30) {
      r = t * 1 + 30;
      i = e - 2;
    } else if (t >= 30) {
      r = t - 30;
      i = e - 1;
    }
    if (i < 1) {
      i = 12 + i;
      s === "AM" ? s = "PM" : s = "AM";
    }
    var o = [ i, r, s ];
    return o;
  }
  function n(e) {
    var t = "", n = e.getHours(), r = 0, i = "", s = e.getMinutes() + 14;
    if (s > 60) {
      s -= 60;
      n += 1;
      n >= 24 && (n === 24 ? n = 0 : n === 25 && (n = 1));
    }
    for (var o = 0; o < 6; o++) {
      if (s < 30) s += 30; else {
        s -= 30;
        n += 1;
      }
      n += 1;
      n === 24 && (n = 0);
      n === 25 && (n = 1);
      if (n < 12) {
        i = " AM";
        r = n;
        n === 0 && (r = "12");
      } else {
        i = " PM";
        r = n - 12;
      }
      r === 0 && (r = 12);
      o === 0 ? s > 9 ? t = t + '<div class="time label">' + r + ":" + s + i + "</div>" : t = t + '<div class="time label">' + r + ":0" + s + i + "</div>" : o === 4 || o === 5 ? s > 9 ? t = t + '<div class="time brightgreen">' + r + ":" + s + i + "</div>" : t = t + '<div class="time brightgreen">' + r + ":0" + s + i + "</div>" : o === 3 ? s > 9 ? t = t + '<div class="time green">' + r + ":" + s + i + "</div>" : t = t + '<div class="time green">' + r + ":0" + s + i + "</div>" : s > 9 ? t = t + ' <div class="time label">' + r + ":" + s + i + "</div>" : t = t + ' <div class="time label">' + r + ":0" + s + i + "</div>";
    }
    return t;
  }
  e();
  window.scrollTo(0, 1);
  $("#sleepnow").click(function() {
    var e = "", t = new Date;
    e = n(t);
    $("#intro").hide();
    $("#picker").hide();
    $("#wake").fadeIn();
    $("#wake-times").html(e);
    $("#wake-times").fadeIn(250);
  });
  $("#calc").click(function() {
    if ($("#hour").val() === "hour" || $("#minute").val() === "minute") return !1;
    var e = $("#hour").val(), n = $("#minute").val(), r = $("#ampm").val(), i = [ e, n, r ];
    e === 12 && (r === "AM" ? r = "PM" : r = "AM");
    var s = [];
    for (var o = 1; o <= 10; o++) {
      var u = t(e, n, r), a = u[0], f = u[1];
      r = u[2];
      var l = "";
      l = u[2];
      a === 12 && (r === "AM" ? l = "PM" : l = "AM");
      if (o === 6 || o === 4 || o === 5 || o === 3) {
        var c = "";
        if (f > 9) if (o === 6) {
          c = '<div class="time">' + a + ":" + f + " " + l + "</div>";
          s.push(c);
        } else {
          c = '<div class="time">' + a + ":" + f + " " + l + "</div>";
          s.push(c);
        } else if (o === 6) {
          c = '<div class="time">' + a + ":0" + f + " " + l + "</div>";
          s.push(c);
        } else {
          c = '<div class="time">' + a + ":0" + f + " " + l + "</div>";
          s.push(c);
        }
      }
      e = a;
      n = f;
    }
    var h = "";
    for (var p = 3; p >= 0; p--) h += s[p];
    $("#picker").hide();
    $("#sleep").fadeIn();
    $("#sleep-times").html(h);
    $("#sleep-times").fadeIn(500);
    var d = "";
    i[1] > 9 ? d = "<b>" + i[0] + ":" + i[1] + " " + i[2] + "</b>" : d = "<b>" + i[0] + ":0" + i[1] + " " + i[2] + "</b>";
    $("#waketime").html(d);
    $("#waketime").fadeIn(1e3);
  });
});
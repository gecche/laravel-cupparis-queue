/**
 * VERSIONE LIBRERIA 2
 */

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function() {
    var initializing = false, fnTest = /xyz/.test(function() {
        xyz;
    }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function() {
    };

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for ( var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function"
                    && typeof _super[name] == "function"
                    && fnTest.test(prop[name]) ? (function(name, fn) {
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();

/**
 * VERSIONE LIBRERIA 2
 */

jQuery.queryStringToArray = function ( query ) {
      var Params = new Object ();
      if ( ! query ) return Params; // return empty object
      var Pairs = query.split(/[;&]/);
      for ( var i = 0; i < Pairs.length; i++ ) {
        var KeyVal = Pairs[i].split('=');
        if ( ! KeyVal || KeyVal.length != 2 ) continue;
        var key = unescape( KeyVal[0] );
        var val = unescape( KeyVal[1] );
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
      }
      return Params;
}

jQuery.fn.serializeAssoc = function() {
  var ss = this.serializeArray();

  var data = {};

  for (var i in ss) {
    var key = ss[i].name;
    var value = ss[i].value;
    if (key.indexOf('[') >= 0) {
      if (!data[key])
        data[key] = [];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  }
  return data;


  // var data = {};
  // $.each( this.serializeArray(), function( key, obj ) {
  //   var a = obj.name.match(/(.*?)\[(.*?)\]/);
  //   if(a !== null)
  //   {
  //     var subName = a[1];
  //     var subKey = a[2];
  //     if( !data[subName] ) data[subName] = {};
  //       if( data[subName][subKey] ) {
  //         if( $.isArray( data[subName][subKey] ) ) {
  //           data[subName][subKey].push( obj.value );
  //         } else {
  //           data[subName][subKey]= [];
  //           data[subName][subKey].push( obj.value );
  //           //data[subName][subKey][key] = obj.value;
  //         };
  //       } else {
  //         data[subName][subKey] = obj.value;
  //       };
  //     } else {
  //       if( data[obj.name] ) {
  //         if( $.isArray( data[obj.name] ) ) {
  //           data[obj.name].push( obj.value );
  //         } else {
  //           data[obj.name] = [];
  //           data[obj.name].push( obj.value );
  //         };
  //       } else {
  //         data[obj.name] = obj.value;
  //       };
  //     };
  //   });
  //   return data;
};


var Utility = {
    _scripts : [],
	initDate : function (key, year_start, year_end) {
		var options_init = '<option value="">--</option>';
		var options = "";

		var dateValue = $('input[name="'+key+'"]').val();
		var yearValue = '';
		var monthValue = '';
		var dayValue = '';
		if (dateValue != '') {
			yearValue = dateValue.substring(0, 4);
			monthValue = dateValue.substring(5, 7);
			dayValue = dateValue.substring(8, 10);
		}

		var selected = '';

		var year = $('[data-year="'+key+'"]');
		var month = $('[data-month="'+key+'"]');
		var day = $('[data-day="'+key+'"]');

		for (var i = 1; i < 32; i++) {
			var j = Utility.padDate(i,2);
			if (dayValue == j) {
				selected = ' selected="selected" ';
			}
			options += '<option value="' + j + '"' + selected + '>' + j + '</option>';
			selected = '';
		}
		day.empty();
		//day.append(options_init + options);
		day.append(options);
		selected = '';
		options = "";
		var man_mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
		for (i = 1; i < 13; i++) {
			j = Utility.padDate(i,2);
			if (monthValue == j) {
				selected = ' selected="selected" ';
			}
			options += '<option value="' + j + '"' + selected + '>' + man_mesi[i - 1] + '</option>';
			selected = '';
		}
		month.empty();
		//month.append(options_init + options);
		month.append(options);

		options = "";
		selected = '';
		var year_1 = year_start;
		var year_2 = year_end;
		if (!year_1 || isNaN(year_1))
			year_1 = 1901;
		if (isNaN(year_2))
			year_2 = (new Date).getFullYear();

		for (i = year_1; i <= year_2; i++) {
			if (yearValue == i)
				selected = ' selected="selected" ';
			options += '<option value="' + i + '"' + selected + '>' + i + '</option>';
			selected = '';
		}
		year.empty();
		//year.append(options_init + options);
		year.append(options);
		/*
		$("#"+id+"_a,#"+id+"_m,#"+id+"_g").change(
			function() {
				man_date_change_new(id);
			}
		);
		*/
		return;
	},
	changeDate : function (key) {
		//var options = '<option value="">--</option>';
		var options = '';

		var year = $('[data-year="'+key+'"]');
		var month = $('[data-month="'+key+'"]');
		var day = $('[data-day="'+key+'"]');
		var selected = "";

		var maxDay = 28;
		if (month.val() == '04' || month.val() == '06' || month.val() == '09' || month.val() == '11') {
			maxDay = 30;
		} else if (month.val() != '02') {
			maxDay = 31
		} else if (year.val() % 4 == 0 || year.val() % 100 == 0)
			maxDay = 29;


		for (var i = 1; i <= maxDay; i++) {
			var j = Utility.padDate(i,2);
			if (day.val() == j)
				selected = ' selected="selected" ';
			options += '<option value="' + j + '"' + selected + '>' + j + '</option>';
			selected = '';
		}

		var ex_day = day.val();
		day.empty();
		day.append(options);
		if (ex_day <= maxDay)
			day.val(ex_day);
		
		var finalDate = $('input[name="'+key+'"]');
		var d = finalDate.val().split(" "); 
		var t = ""; // tempo in caso di campo datetime
		if (d.length > 1)
			t = d[1];
		var date = '';
		if (year.val() == '' || month.val() == '' || day.val() == '') {
			date = ''//finalDate.val('');
		} else {
			var date =  year.val() + '-' + month.val() + '-' + day.val();//finalDate.val(year.val() + '-' + month.val() + '-' + day.val());
		}
		if (t != "")
			date += ' ' + t;
		finalDate.val(date);
		return;
	},
	padDate : function (str, max, char) {
		str = str.toString();
		if (!char)
			char = "0";
			//console.log(str + ' ' + max + ' ' + char + ' ' + str.length);
		return str.length < max ? Utility.padDate(char + '' + str, max, char) : str;
	},
	// cambia lo stato di una checkbox
	toggleCheck : function (checkbox) {
		checkbox.prop('checked',!checkbox.prop('checked'));
	},
    isInt : function (value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    },
    dbDate : function (date) {
    	var ds = date.getFullYear();
    	var m = date.getMonth()+1;
	    ds += "-"+ (m>9?m:"0"+m);
	    ds += "-"+ (date.getDate()>9?date.getDate():"0"+date.getDate());
	    ds += " "+ (date.getHours()>9?date.getHours():"0"+date.getHours()); 
	    ds += ":"+ (date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes()); 
	    ds += ":"+ (date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds()); 
	    return ds;
    },
    jsDate : function (dbDate) {
    	var dateParts = dbDate.split("-");
    	console.log(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
		var jd = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
		return jd;
    },

    formatDate : function(dbDate,format) {
        var d = new Date(Date.parse(dbDate));
        if (isNaN(d.getTime()))
            return "";
        return d.toLocaleDateString($.locale,$.cupparisDateFormat(format));
    },

    // ritorna il valore in get di un parametro della finestra principale
	getURLParameter : function(name) {
		return Utility.getURLParameterFromString(location.search,name);
		//return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
	},
	
	// ritorna il valore in get di un parametro di un URL
	getURLParameterFromString : function(location,name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location)||[,""])[1].replace(/\+/g, '%20'))||null;
	},
	getURLParameterRegexp : function(reg) {
		return decodeURIComponent((new RegExp('[?|&]' + reg + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	},
	getAllUrlParams : function () {
		var params = {};
		var tmp = location.search.split("?");
		if (tmp.length != 2)
			return params
		var sparams = tmp[1].split("&");
		for(var i in sparams) {
			var tmp = sparams[i].split("=");
			if (tmp.length != 2)
				continue;
			var name = tmp[0];
			var value = tmp[1];
			if (name.indexOf('[]') >= 0) {
				if (!params[name])
					params[name] = [];
				params[name].push(decodeURIComponent(value) )
			} else {
				params[name] = decodeURIComponent(value);
			}

		}
		return params;

	},
	// crea un copia di un oggetto complesso
	cloneObj : function (obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	nl2br : function (str) {
		return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
	},

    loadScript : function (scriptName, callback) {
        var self = this;
        if (!self._scripts[scriptName]) {
            self._scripts[scriptName] = true;
            var body 		= document.getElementsByTagName('body')[0];
            var script 		= document.createElement('script');
            script.type 	= 'text/javascript';
            script.src 		= scriptName;

            // then bind the event to the callback function
            // there are several events for cross browser compatibility
            // script.onreadystatechange = callback;
            script.onload = callback;

            // fire the loading
            body.appendChild(script);

        } else if (callback) {
            callback();
        }
    },

    // funzioni trasformazioni standard case

    NON_WORD_REGEXP : /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g,
    CAMEL_CASE_REGEXP : /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g,
    TRAILING_DIGIT_REGEXP : /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g,
    sentenceCase : function (str) {
        if (str == null) {
            return '';
        }

        return String(str)
            // Enables camel case support.
            .replace(Utility.CAMEL_CASE_REGEXP, '$1 $2')
            // Add a space after any digits.
            .replace(Utility.TRAILING_DIGIT_REGEXP, '$1 $2')
            // Remove all non-word characters and replace with a single space.
            .replace(Utility.NON_WORD_REGEXP, ' ')
            // Trim whitespace around the string.
            .replace(/^ | $/g, '')
            // Finally lower case the entire string.
            .toLowerCase();
    },
    camelCase : function (string) {
        return Utility.sentenceCase(string)
        // Replace periods between numeric entities with an underscore.
        .replace(/(\d) (?=\d)/g, '$1_')
        // Replace spaces between words with a string upper cased character.
        .replace(/ (\w)/g, function (_, $1) {
          return $1.toUpperCase();
        });
    },
    costantCase : function (string) {
      return Utility.snakeCase(string).toUpperCase();
    },
    dotCase : function (string) {
      return Utility.sentenceCase(string).replace(/ /g, '.');
    },
    isLowerCase : function (string) {
        return Utility.lowerCase(string) === string;
    },
    isUpperCase : function (string) {
        return Utility.upperCase(string) === string;
    },
    lowerCase : function (str) {
        var toLower = String.prototype.toLowerCase;
        return str == null ? '' : toLower.call(str);
    },
    paramCase : function (string) {
        return Utility.sentenceCase(string).replace(/ /g, '-');
    },
    pascalCase : function (string) {
        return Utility.upperCaseFirst(Utility.camelCase(string));
    },
    pathCase : function (string) {
      return Utility.sentenceCase(string).replace(/ /g, '/');
    },
    snakeCase : function (string) {
        return Utility.sentenceCase(string).replace(/ /g, '_');
    },
    swapCase : function (str) {
        if (str == null) {
            return '';
        }
        var result = '';
        for (var i = 0; i < str.length; i++) {
            var c = str[i];
            var u = c.toUpperCase();
            result += u === c ? c.toLowerCase() : u;
        }
        return result;
    },
    titleCase : function (string) {
        return Utility.sentenceCase(string).replace(/^\w| \w/g, Utility.upperCase);
    },
    upperCase : function (str) {
        var upperCase = String.prototype.toUpperCase;
        return str == null ? '' : upperCase.call(str);
    },
    upperCaseFirst : function (str) {
        if (str == null) {
            return '';
        }

        str = String(str);

        return str.charAt(0).toUpperCase() + str.substr(1);
    },
    getMimetypeIcon : function (filename) {
        var icons = {
            default   : 'fa fa-3x fa-file-o',
            xls       : 'fa fa-3x fa-file-excel-o',
            zip       : 'fa fa-3x fa-file-archive-o',
            mp3       : 'fa fa-3x fa-audio-o',
            jpg       : "fa fa-3x fa-image-o",
            //png       : "fa fa-3x fa-image-o",
            pdf       : "fa fa-3x fa-file-pdf-o"
        };
        if (!filename)
            return icons.default;
        var ext =  filename.split('.').pop();
        if (icons[ext])
            return icons[ext];
        else
            return icons.default;
    },
    test : function() {
        // sostituire bfyChangeCase con Utility

        log.info(Utility.camelCase('test') === 'test');
        log.info(Utility.camelCase('TEST') === 'test');

        log.info(Utility.camelCase('test string')=== 'testString');
        log.info(Utility.camelCase('Test String')==='testString');

        log.info(Utility.camelCase('dot.case')==='dotCase');
        log.info(Utility.camelCase('path/case')==='pathCase');
  
        log.info(Utility.camelCase('version 1.2.10')==='version1_2_10');
        log.info(Utility.camelCase('version 1.21.0')==='version1_21_0');

        log.info(Utility.camelCase('TestString')==='testString');

        log.info(Utility.constantCase('test')==='TEST');
        log.info(Utility.constantCase('TEST')==='TEST');

        log.info(Utility.constantCase('test string')==='TEST_STRING');
        log.info(Utility.constantCase('Test String')==='TEST_STRING');
      
        log.info(Utility.constantCase('dot.case')==='DOT_CASE');
        log.info(Utility.constantCase('path/case')==='PATH_CASE');
      
        log.info(Utility.constantCase('TestString')==='TEST_STRING');
        /* 
        it('should dot case a single word', function () {
    assert.equal(dotCase('test'), 'test');
    assert.equal(dotCase('TEST'), 'test');
  });

  it('should dot case regular sentence cased strings', function () {
    assert.equal(dotCase('test string'), 'test.string');
    assert.equal(dotCase('Test String'), 'test.string');
  });

  it('should dot case non-alphanumeric separators', function () {
    assert.equal(dotCase('dot.case'), 'dot.case');
    assert.equal(dotCase('path/case'), 'path.case');
  });

  it('should dot case dot cased strings', function () {
    assert.equal(dotCase('TestString'), 'test.string');
    assert.equal(dotCase('TestString1_2_3'), 'test.string.1.2.3');
  });
*/
    }
};
/**
 * VERSIONE LIBRERIA 3
 */

function Log(enabled) {
	this.enable = function () {
		Log.prototype.info = console.info.bind(window.console);
		Log.prototype.debug = console.debug.bind(window.console);
		Log.prototype.warn = console.warn.bind(window.console);
		Log.prototype.error = console.error.bind(window.console);
	}
	this.disable = function () {
		Log.prototype.info = function () {};
		Log.prototype.debug = function () {};
		Log.prototype.warn = function () {};
		Log.prototype.error = function () {};
	}

	if (enabled) {
		this.enable();
	} else {
		this.disable();
	}
}
var log = new Log(true);






// function Log(enabled) {
// 	var self = this;
// 	this.INFOLEVEL = 3;
// 	this.DEBUGLEVEL = 2;
// 	this.WARNLEVEL = 1;
// 	this.ERRORLEVEL = 0;
// 	this._logLevel = this.INFOLEVEL;
// 	this._logging = enabled;
// 	this._lines = new Array();
// 	this.maxline = 100;
// 	this._INFOBGCOLOR = "#F0FFFF";
// 	this._DEBUGBGCOLOR = "#FFFFFF";
// 	this._WARNBGCOLOR = "#FFFFE0";
// 	this._ERRORBGCOLOR = "#FFE4E1";
// 	this._wpopup = null;
//
// 	this.disable = function () {
// 		this._logging = 0;
// 	}
//
// 	this.enable = function() {
// 		this._logging = 1;
// 	}
//
// 	this.setLogLevel = function (level) {
// 		this._logLevel = level;
// 	}
//
// 	this.info = function (msg) {
// 		if (!self._logging || self._logLevel < self.INFOLEVEL ) return;
// 		if (console && console.info) {
// 			var callerName = arguments.callee.caller?arguments.callee.caller.name:"main";
// 			console.log(arguments);
// 			//arguments = arguments? arguments.unshift(callerName):[callerName];
// 			//arguments.unshift(callerName);
// 			console.info.apply(console,arguments);
// 		};
// 	}
//
// 	this.warn = function (msg) {
// 		var callerName = arguments.callee.caller?arguments.callee.caller.name:"main";
// 		if (!self._logging || self._logLevel < self.WARNLEVEL) return;
// 		if (console && console.warn) {
// 			console.warn.apply(console,arguments);
// 			/*
// 			//console.warn(callerName,msg);
// 			if (Array.isArray(arguments))
// 				console.warn.apply(null,arguments);
// 			else
// 				console.warn(callerName,msg);
// 				*/
// 		}
// 		self._write(self._WARNBGCOLOR , msg);
// 	}
//
// 	this.error = function (msg) {
// 		var callerName = arguments.callee.caller?arguments.callee.caller.name:"main";
// 		if (!self._logging ) return;
// 		if (console && console.error) {
// 			console.error.apply(console,arguments);
// 			/*
// 			//console.error(callerName,msg);
// 			if (Array.isArray(arguments))
// 				console.error.apply(null,arguments);
// 			else
// 				console.error(callerName,msg);
// 				*/
// 		}
// 		self._write(self._ERRORBGCOLOR , msg);
// 	}
//
// 	this.debug = function (msg) {
// 		var callerName = arguments.callee.caller?arguments.callee.caller.name:"main";
// 		if (!self._logging || self._logLevel < self.DEBUGLEVEL) return;
// 		//console.log(arguments,Array.isArray(arguments),typeof arguments);
// 		if (console && console.debug) {
// 			console.debug.apply(console,arguments);
// 			//console.debug(callerName,msg);
// 			/*
// 			if (Array.isArray(arguments))
// 				console.debug.apply(null,arguments);
// 			else
// 				console.debug(callerName,msg);
// 				*/
// 		}
// 		self._write(self._DEBUGBGCOLOR , msg);
// 	}
//
// 	this._write = function (bgcolor,msg) {
// 		if (self._lines.length == 100)
// 			self._lines.splice(0, 1);
// 		self._lines.push({bgcolor:bgcolor,msg:msg});
// 		//var str = "<div style='background-color:"+bgcolor+"'>"+msg+"</div>";
// 		//self._lines.push(str);
// 	}
//
// 	this.show = function () {
// 		if (!self._wpopup)
// 			self._wpopup = window.open();
// 		var lines = self._lines.join("\n");
// 		self._wpopup.document.write(lines);
// 	};
// 	this.showB = function (modal_id) {
// 		var lines = self._lines.join("\n");
// 		$('#'+modal_id + " .modal-body").html("");
// 		for (var i in self._lines) {
// 			var line = self._lines[i];
// 			var msg = "";
// 			if (line.msg instanceof String)
// 				msg = line.msg;
// 			else
// 				msg = JSON.stringify(line.msg);
// 			$('#'+modal_id + " .modal-body").append("<div style='background-color:"+line.bgcolor+"'>");
// 			$('#'+modal_id + " .modal-body").append(i+")"+msg);
// 			$('#'+modal_id + " .modal-body").append("</div>");
// 		}
// 		//$('#'+modal_id + " .modal-body").html(lines);
// 		$('#'+modal_id).modal("show");
// 	}
// }

//var log = new Log(1);
/**
 * VERSIONE LIBRERIA 3
 */

/**
 * Versione 0.7
 *
 * extra attributes
 *
 * data-ajax 			: 	attiva la trasformazione sull'elemento
 *
 * data-container 		: 	selettore container puo' essere un id o un class css, qualsiasi valido
 * 							jquery selector (#myid .myclass)
 *
 * data-callback		: 	funzione callback che verra' richiamata dopo il caricamento del contenuto ajax o del template, callback(data,JQE)
 *
 * data-content			:  url del file di template da caricare dentro il contenitore
 *
 * data-lang			: key in lingua per siti multilingua
 *
 * data-lang_p0...pn	: parametri per traduzioni parametriche variabile da 0 a n, secondo i parametri necessari
 *
 * data-visible 		: esegue l'eval del contenuto per stabilire se l'elemento deve essere nascosto o visible
 * 						  inserire codice javascript valido
 *
 * data-remove			: come data-visible ma l'elemento viene rimosso
 *
 * $.dialogsOption : funzione per settare i titoli di default delle dialog
 *
 * $.parseTemplate : funzione...
 */

jQuery.fn.extend({
    ok: function(f) {
        $(this).find('.btok').unbind();
        $(this).find('.btok').click(function() {
            f();
            return true;
        });
        return $(this);
    },
    cancel: function(f) {
        $(this).find('.btcancel').unbind();
        $(this).find('.btcancel').click(function() {
            f();
            return true;
        });
        return $(this);
    }/*,
    hide : function (f) {
        $(this).localf = f;
        $(this).on('hidden.bs.modal', function () {
        	if ($(this).localf)
                return $(this).localf();
        });
        return $(this);
    }*/
});

$.ajaxContent = function(selector, mainCallback,options) {
    var self = this;
    self.info = function(msg) {
    	try {
    		log.info(msg);
    	} catch(e){ console.log(msg);}
    };
    self.warn = function(msg) {
        return self.info(msg);
        if (self.activeDebug && console && console.warn)
            console.warn(msg);
    };

    self.error = function(msg) {
        return self.info(msg);
        if (self.activeDebug && console && console.error)
            console.error(msg);
    };
    self.debug = function(msg) {
        return self.info(msg);
        if (self.activeDebug && console && console.debug)
            console.debug(msg);
    };

    self._isFunction = function(f) {
        return (typeof window[f] === "function");
    };

    self._ajax = function(method, params, jQE) {
        if (self._isFunction(jQE.data("precall"))) {
            if (!window[jQE.data("precall")](jQE))
                return false;
        }
        if (jQE.data("container")) {
            $(jQE.data("container")).html(self.loader);
        }
        var url = jQE.is("form") ? jQE.attr("action") : jQE.attr("href");

        method(Facade.getUrl(url), params, function(data) {

            if (self._isFunction(jQE.data("callback"))) {
                window[jQE.data("callback")](data, jQE);
                return;
            }

            // se ho il template il risultato e' un un json
            if (jQE.data("template")) {
                self._renderTemplate(jQE, data);
                return;
            }
            if (jQE.data("container")) {
                $(jQE.data("container")).html(data);
                //self.debug("riapplico ajaxContent");
                //$(jQE.data("container")).ajaxContent();
                $.ajaxContent(jQE.data("container"));
                return;
            }

            self.warn("non trovata nessuna regola per la gestione del data");

        }).fail(function(data) {
            self.error("fail");
            self.error(data);
            $.waitDialogClose();
            $.errorDialog("500 Internal Server Error");
        });

        return false;
    };

    self._parsePage = function (local_callback) {
    	self.info("_parsePage");
    	$.each($(selector).find('button[data-page]'), function() {

            try {

                var jQE = $(this);
                self.info("found button, data-page  " + jQE.data("page") + " data-callback " + jQE.data("callback") + ":" + jQE.data("app_name"));
                var callback = jQE.data("callback")?jQE.data("callback"):null;
                jQE.unbind('click');
                jQE.click(function() {
                	try {
                		(window[jQE.data("app_name")]).loadPage(jQE.data("page"),callback);
                	} catch(e) {
                		alert(e.message);
                	}

                });
            } catch (e) {
            	self.info(e.message);
                return local_callback(e);
            }

        });
    	local_callback();
    },
    self._parseIncludes = function(local_callback) {
    	self.info("_parseIncludes");
        $.each($(selector).find('div[data-content]'), function() {

            try {
            	var jQE = $(this);
                self.info("found div, data-content  " + jQE.data("content") + " data-callback " + jQE.data("callback"));
            	var html = $.ajax({
                    type: "GET",
                    url: jQE.data("content"),
                    async: false
                }).responseText;
            	jQE.html(html);
            	if (jQE.data("callback") && self._isFunction(jQE.data("callback"))) {
                    window[jQE.data("callback")](jQE);
                }
            } catch (e) {
                self.error("parseInclude error " + e.message);
                return local_callback(e);

            }

        });
        local_callback();
    };

    self._parseLinks = function(local_callback) {
    	self.info("_parseLinks");
        $.each($(selector).find('a[data-ajax]'), function() {
            var jQE = $(this);
            self.info("found a, container  " + jQE.data("container") + " precall " + jQE.data("precall") + " cb " + jQE.data("callback"));
            jQE.unbind('click');
            jQE.click(function() {
                if ($(this).data("confirm")) {
                    $.confirmDialog(jQE.data("confirm")).ok(function() {
                        self._ajax($.get, {}, jQE);
                    });
                } else
                    self._ajax($.get, {}, jQE);
                return false;
            });
        });
        local_callback();
    };

    self._parseForms = function(local_callback) {
    	self.info("_parseForms");
        $.each($(selector).find('form[data-ajax]'), function() {
            var jQE = $(this);
            self.info("found form name:" + jQE.attr("name") + ", container:" + jQE.data("container"));
            jQE.unbind('submit');
            jQE.submit(function() {
            	//alert("ok ");
                //var action = jQE.attr("action");

                var params = jQE.serialize();
                var method = $.get;
                // compatibilita' con versione 1.9 di jquery
                var attr = jQE.attr("method");
                if (typeof attr === 'object')
                    attr = jQE.prop("method");

                if (attr && attr.toLowerCase() == "post")
                    method = $.post;

                if (jQE.data("confirm")) {
                    $.confirmDialog(jQE.data("confirm")).ok(function() {
                        self._ajax(method, params, jQE);
                    });
                } else
                    self._ajax(method, params, jQE);

                return false;
            });
        });
        local_callback();
    };

    self._parseLang = function (local_callback) {
    	self.info("_parseLang " + $('[data-lang]').length);
    	$.translateDocument(selector,function () {
    		local_callback();
    	})
    };

    self._renderTemplate = function(jQE, json) {
        var tplId = jQE.data("template");
        if ($(tplId).size() == 0) {
            self.warn("nessun template trovato");
            return;
        }
        $.renderJson(jQE.data("template"), jQE.data("container"), json);
    };




    self._parseIncludes(function () {
		self._parseLinks(function () {
			self._parseLang(function () {
	    		self._parseForms(function () {
	    			self._parsePage(function () {
        				if (mainCallback) {
        					mainCallback();
        				}
        			});
        		});
        	});
    	});
    });



};

$.translateDocument = function (selector,callback) {
	log.info("translateDocument " + selector);
	var localThis = this;
	localThis._translate = function (jQE,placeholder) {
		var params = [];
		var i = 0;
		while(jQE.data('lang_p'+i) ) {
			params.push(jQE.data('lang_p'+i) );
			i++;
		}
	//$.each($(selector).find('button[data-lang]'), function() {
		//self.info("found " + $(this).prop('tagName'));
		switch(jQE.prop("tagName") ) {
		case 'INPUT':
		case 'SELECT':
		case 'TEXTAREA':
			if (placeholder)
				jQE.attr("placeholder",$.translate(jQE.attr('placeholder'),params));
			else
				jQE.val( $.translate(jQE.data('lang'),params));
			break;
		default:
			//log.debug("translate to " + self.lang_defs[$(this).data('lang')]);
			jQE.html($.translate(jQE.data('lang'),params));
			break;
		}
	};

	try {

		$.each($(selector).find('[data-lang],[placeholder]'),function () {
			var jQE = $(this);
			if (jQE.attr('placeholder'))
				localThis._translate(jQE,true);
			else
				localThis._translate(jQE,false);
        });
		// cerco traduzioni anche nei template in tag script

		$.each($(selector).find('script[id]'),function () {
			var obj = $('<div/>');
			obj.html( $(this).html());
			$.each(obj.find("[data-lang]"), function() {

				var jQE = $(this);
				log.info("found data in script " + jQE.data('lang') + " " + jQE.prop('tagName') + $.translate(jQE.data('lang')));
				localThis._translate(jQE);
			});
			$(this).html(obj.html());
		});

		//$.each()
	 } catch (e) {
     	self.info(e.message);
     	if (callaback)
     		return callback(e);
     	else {
     		log.error("Errore in translateDocument");
     		log.error(e);
     	}
     }
	 if (callback)
		 callback();
};

$.containerInit = function(attrs) {
	var attributes = "";
	if (attrs) {
		for (var k in attrs) {
			attributes += "data-"+ k + '="' + attrs[k] + '" ';
		}
	}
	// confirm dialog Template
    var dlgTemplate =
		'<div id="confirmDialog" class="modal fade">\
		  <div class="modal-dialog">\
		    <div class="modal-content">\
		      <div class="modal-header">\
		        <button type="button" class="close btcancel" data-dismiss="modal" aria-hidden="true">&times;</button>\
		        <h4 class="modal-title">Richiesta di Conferma</h4>\
		      </div>\
		      <div class="modal-body">\
		      	<span class="msg">Sei Sicuro?</span>\
		      </div>\
		      <div class="modal-footer">\
		        <button type="button" class="btn btn-primary btok" data-dismiss="modal">Si</button>\
		        <button type="button" class="btn btn-primary btcancel" data-dismiss="modal">No</button>\
		      </div>\
		    </div><!-- /.modal-content -->\
		  </div><!-- /.modal-dialog -->\
		</div><!-- /.modal -->';
    $('body').append(dlgTemplate);

    //  message dialog template
    dlgTemplate =
            '<div id="messageDialog" class="modal fade">\
				  <div class="modal-dialog">\
	    <div class="modal-content">\
	      <div class="modal-header">\
	        <button type="button" class="close btok" data-dismiss="modal" aria-hidden="true">&times;</button>\
	        <h4 class="modal-title">Informazione</h4>\
	      </div>\
	      <div class="modal-body">\
				<div class="alert alert-info">\
					<span class="msg">message</span>\
				</div>\
	      </div>\
	      <div class="modal-footer">\
	        <button type="button" class="btn btn-primary btok" data-dismiss="modal">Chiudi</button>\
		  </div>\
	    </div><!-- /.modal-content -->\
	  </div><!-- /.modal-dialog -->\
	</div><!-- /.modal -->';
    $('body').append(dlgTemplate);
    // error dialog template
    dlgTemplate =
            '<div id="errorDialog" class="modal fade">\
				  <div class="modal-dialog">\
				    <div class="modal-content ">\
				      <div class="modal-header">\
				        <button type="button" class="close btcancel" data-dismiss="modal" aria-hidden="true">&times;</button>\
				        <h4 class="modal-title">Messaggio Errore</h4>\
				      </div>\
				      <div class="modal-body">\
						<div class="alert alert-danger">\
				      		<span class="msg">Error</span>\
						</div>\
				      </div>\
				      <div class="modal-footer">\
				        <button type="button" class="btn btn-primary btok" data-dismiss="modal">Chiudi</button>\
				      </div>\
				    </div><!-- /.modal-content -->\
				  </div><!-- /.modal-dialog -->\
				</div><!-- /.modal -->';
    $('body').append(dlgTemplate);
    // progress dialog template
    dlgTemplate =
            '<div id="progress_dialog" class="modal fade">\
				  <div class="modal-dialog">\
				    <div class="modal-content">\
				      <div class="modal-header">\
				        <button type="button" class="close btcancel" data-dismiss="modal" aria-hidden="true">&times;</button>\
				        <h4 class="modal-title">Caricamento</h4>\
				      </div>\
				      <div class="modal-body">\
				      	<div class="progress progress-striped active">\
								<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>\
							</div>\
				      </div>\
				      <div class="modal-footer">\
				        <button type="button" class="btn btn-primary btok" data-dismiss="modal">Chiudi</button>\
				      </div>\
				    </div><!-- /.modal-content -->\
				  </div><!-- /.modal-dialog -->\
				</div><!-- /.modal -->';
    $('body').append(dlgTemplate);
    dlgTemplate =
            '<div id="waitDialog" class="modal fade">\
				  <div class="modal-dialog">\
				    <div class="modal-content">\
				      <div class="modal-header">\
				        <button type="button" class="close btcancel" data-dismiss="modal" aria-hidden="true">&times;</button>\
				        <h4 class="modal-title">Attendere</h4>\
				      </div>\
				      <div class="modal-body text-center">\
						<i class="fa fa-cog fa-spin fa-3x"></i>\
				      </div>\
				      <div class="modal-footer">\
				      </div>\
				    </div><!-- /.modal-content -->\
				  </div><!-- /.modal-dialog -->\
				</div><!-- /.modal -->';
    $('body').append(dlgTemplate);

    dlgTemplate =
        '<div id="generalDialog" class="modal fade">\
			  <div class="modal-dialog">\
			    <div class="modal-content">\
			      <div class="modal-header">\
			        <button type="button" class="close btcancel" data-dismiss="modal" aria-hidden="true">&times;</button>\
			        <h4 class="modal-title">Titolo</h4>\
			      </div>\
			      <div data-modal_error class="alert alert-danger hide "></div>\
			      <div class="modal-body">\
			      </div>\
			      <div class="modal-footer">\
    				<button type="button" class="btn btn-primary btok" data-dismiss="modal">Si</button>\
        			<button type="button" class="btn btn-primary btcancel" data-dismiss="modal">No</button>\
			      </div>\
			    </div><!-- /.modal-content -->\
			  </div><!-- /.modal-dialog -->\
			</div><!-- /.modal -->';
    $('body').append(dlgTemplate);

    // container di uso generale per i vari render dei template script
    $('body').append('<div id="general_container" class="hide"></div>');
    $('body').append('<div id="wait" class="overlay hide">' +
					'<span data-msg style="position:absolute;width:100%;top:50%;text-align:center;color:white"></span>' +
					'</div>');
};

$.locale = "it";

$.langDefs = {};


$.createDynamicContainer = function (sourceTemplate) {
	var id= "dy_"+ (new Date().getTime()) + "_" + (Math.floor(Math.random() * 10000));
	jQuery('<div/>', {
	    id: id,
	    class : 'hide'
	}).appendTo('body');
	if (sourceTemplate)
		$('#'+id).html($.getDomTemplate(sourceTemplate).html());
	else
		$('#'+id).html(" ");
	return $('#'+id);
}

$.generalContainer = function () {
	return $('#general_container');
}

$.generalContainer.selector = function () {
	return '#general_container';
}

$.waitStart = function (msg,container) {
    if (container) {
        jQuery(container).fadeTo('slow',.30).css('pointer-events','none').css('cursor','wait');
        return ;
    }

    if (msg) {
        $('#wait').find('[data-msg]').html(msg);
    }
	$('#wait').removeClass('hide');
	$('#wait').css('cursor','wait');
}

$.waitEnd = function (container) {
    if (container) {
        jQuery(container).fadeTo('slow',1).css('cursor','auto').css('pointer-events','auto');
        return ;
    }
	$('#wait').addClass('hide');
	$('#wait').css('cursor','default');
    $('#wait').find('[data-msg]').html("");
}

$.translate = function (key,plural,params) {
	var s = $.langDefs[key];
	if (!s)
		return key;
    var testo = s;
    if (testo.indexOf('|') >= 0) {
        if (plural > 0) {
            var tmp = testo.split("|");
            testo = tmp.length>plural?tmp[plural]:tmp[0];
        } else 
            testo = testo.substr(0, testo.indexOf('|'));
    }
	if (params instanceof Array) {
		for (var i = 0; i < params.length; i++) {
			testo= testo.replace("(" + i +")", params[i] );
		}
	}
	return testo;
};

$.translateRaw = function (key,plural,params) {
    var s = $.translate(key,plural,params);
    if (s === key) {
        return "";
    }
    return s;
};

$.getDomTemplate = function (id) {
	if ( $(id).prop("tagName") != "SCRIPT")
		return $(id);
	var obj = $('<div/>');
	if ($(id).children().length ) {
		obj.html($(id).children()[0].outerHTML);
	} else if ($(id).length == 1){
		obj.html( $(id).html());
	} else {
		log.error("template not found with id " + id);
	}
	return obj;
};


$.loadBody = function (url_content,callback,pc) {
	var page_container = pc?pc:"#page_container";
	try {
		console.log("loadbody... " + url_content);
		$.get(url_content,{},function (data) {
			console.log("loaded");
			$(page_container).html(data);
			if (callback)
				callback();
		}).fail(function (dataText) {
			console.log(dataText);
			alert("failed to load " + url_content);
		});
	} catch(e) {
		alert("loadBody " + e.message);
	}

};


$.cupparisDateFormat = function (key) {
	var formats = {
		'numeric' : { year: 'numeric', month: '2-digit', day: '2-digit' },
		'numeric-time' : { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'},
		'short' : { year: 'numeric', month: 'short', day: '2-digit' },
		'short-2' : { month: 'short', day: '2-digit' },
		'medium' : { year: 'numeric', month: 'long', day: '2-digit' },
		'long' : { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' },
		'short-time' : { hour: '2-digit', minute: '2-digit'},
		'long-time' : { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit'},
		'time' :{hour: '2-digit', minute: '2-digit', second: '2-digit'},
		'year' : {year:'numeric'},
		'year-month' : {year:'numeric',month:'long'},

	}

	return formats[key]?formats[key]:"";
}

// accumulatore per calcolo del tempo perso per i renders dei template
$.renderTimeAmount = 0.0;
/**
 * renderJson renderizza un html sostituendo i valori presenti in alcuni attributi con i valori passati
 * dal json.
 * @sourceContainer : rappresenta il contenitore sorgente che verra' parserizzato e sostituiti i valori con i json passato
 * @destContainer : rappresente il contenitore html che riceverera' il risultato del parsing di sourceContainer con i valori
 * 					presenti nel json
 * @value : array associativo o array di array associati
 * @father : in caso di sotto template i valori correnti del padre
 *
 * attributi speciali
 *
 * data-field :			indica il nome del campo nel vettore associativo da renderizzare nell'elemento html
 * data-template : 		indica un template esterno da utilizzare con data-field da utilizzare per renderizzare il
 * 				   		valore. In questo caso si creano i template innestati e il data-field puo' essere un vettore
 * 						o un valore
 * data-totranslate:	indica che la key dentro l'attributo data-field deve essere concatenato con '_'+lang per otternere il valore
 * data-trim:			contiene un numero che indica che il valore deve essere trimmato del valore di data-trim
 * data-date:			indica che data-field e' un valore di data e usa il pattern di data-date per renderizzare
 * 						la data
 *
 */
$.renderJson = function(sourceContainer, destContainer, data,father) {
	//log.info("renderJson " + sourceContainer + " to " + destContainer);
	// funzione locale chiamata per render del singolo elmento
	var renderJsonElement = function (jQelement,data,counter,length) {
		//log.info(RIENTRO + jQelement.html()  + " " + JSON.stringify(data) )
        if (jQelement.attr('data-debug')) {
            log.debug('renderJson DEBUG:','data-attrs',jQelement.data(),'data-param',data,'counter',counter,'length',length);
            //return ;
        }
		var attrField = jQelement.attr('data-field');
		try {
			//if (jQelement.data('field')) {
			if (typeof attrField !== typeof undefined && attrField !== false) {// i lang non devo fare niente solo controllare l'attributo visible
				if (jQelement.data('template') || jQelement.data('self')) {

					var tplId = jQelement.data('template')?jQelement.data('template'):jQelement.data('self');
					var istanceData = data[jQelement.data("field")];
					if (!istanceData) {
						istanceData = data;
					}

					if ( istanceData instanceof Array) {
						if (istanceData.length > 0) {

							$.renderJson(tplId, jQelement, istanceData,data);

						}
					} else {

						$.renderJson(tplId, jQelement, istanceData,data);
					}

				} else {
					var fieldValue = null;
					if (jQelement.data('totranslate')) {
						fieldValue = data[jQelement.data("field") + "_" + $.locale ];
					} else {
                        // controllo che data-field non sia la parola chiave value
                        // se e' value prima controllo che il parametro data sia un oggetto e che abbia la key value
                        // altrimenti il valore e' proprio data e non data[value]
                        if (jQelement.data("field")== 'value' && ( !_.isObject(data) || !(jQelement.data("field") in data) ) )
				            fieldValue =data;
                        else
                            fieldValue = data[jQelement.data("field")];
                            
						// accetto anche i sotto campi del tipo data.field
						var tmp = jQelement.data("field");
						if (tmp.split('.').length == 2) {
							tmp = tmp.split('.');
							fieldValue = data[tmp[0]][tmp[1]];
						}
						
					}
					if (parseInt(jQelement.data('trim')) > 0) {
						var chars = parseInt(jQelement.data('trim'));
						fieldValue = jQuery.trim(fieldValue);
                        if (fieldValue.length > chars)
                            //fieldValue = fieldValue.substring(0, chars).split(" ").slice(0, -1).join(" ") + "...";
                            fieldValue = fieldValue.substring(0, chars) + "...";
					}
					if (jQelement.data('date')) {
						// se aggiungo la T la date tiene conto del locale.
                        // if (fieldValue && fieldValue.length > 10) {
                        //     fieldValue = fieldValue.replace(" ","T");
                        // }

                        var d = new Date(Date.parse(fieldValue));
                        // provo come intero timestamp in millisecondi
                        if (isNaN(d.getTime()))
                            d = new Date(parseInt(fieldValue));

                        if (isNaN(d.getTime()))
                            fieldValue = "";
                        else
                            fieldValue = d.toLocaleDateString($.locale,$.cupparisDateFormat(jQelement.data('date')));


                        // var d = new Date(Date.parse(fieldValue));
                        // if (isNaN(d.getTime()))
                        //     fieldValue = "";
                        // else
						 //  fieldValue = d.toLocaleDateString($.locale,$.cupparisDateFormat(jQelement.data('date')));
					}
					if (jQelement.is("input")) {
		    			jQelement.attr('value',fieldValue);
		            } else if (jQelement.is("select")) {
                        if (jQelement.data("source")) {
                            try {
                                var source = data[jQelement.data("source")];

                                var source_order = [];

                                if (jQelement.data("sourceorder")) {
                                    source_order = data[jQelement.data("sourceorder")];
                                } else {
                                    source_order = _.sortBy(_.keys(source), function (num) {
                                        return num;
                                    });
                                }
                                jQelement.html("");

                                for (var i = 0; i < source_order.length; i++) {
                                    //for (var v in self.data.domainValues) {
                                    var v = source_order[i];

                                    //console.log('OPTIONS: ',v);
                                    var selected = false;

                                    if (v == fieldValue) {
                                        selected = true;
                                    }

                                    var opt = $('<option>').attr({
                                        value : v
                                    });
                                    if (selected)
                                        opt.attr('selected','selected');
                                    opt.html(source[v]);
                                    jQelement.append(opt);

                                }

                                // for (var v in source) {
                                // 	var selected = '';
                                // 	if (fieldValue && (v==fieldValue)) {
                                // 		selected = ' selected="selected" ';
                                // 	}
                                // 	jQelement.append('<option' + selected + ' value="' + v + '">' + source[v] + '</option>');
                                // }
                            } catch(e) {
                                log.error(e);
                            }

                        }
                        else {
                            jQelement.find('option[value="' + fieldValue + '"]').attr('selected','selected');
                        }
                        // TODO manca la selezione del valore corrente
						/*
						 if (fieldValue) {
						 $(this).find('option[value="'+fieldValue+'"]').attr('selected','selected');
						 }
						 */
                        console.log('select',$(this).find('option[value='+fieldValue+']'),fieldValue,jQelement.data("source"));

						/*
						 jQelement.html("");
						 for (var v in fieldValue) {
						 jQelement.append('<option value="' + v + '">' + fieldValue[v] + "</option>");
						 }
						 */
		            } else if (jQelement.is("img")) {
		            	jQelement.attr("src",fieldValue);
		            } else {
		            	if (jQelement.data("append")) {
		            		jQelement.append(fieldValue);
		            	}else if (jQelement.data("prepend")) {
		            		jQelement.prepend(fieldValue);
		            	} else
		            		jQelement.html(fieldValue);
		            }
				}

	    	}
			/*
			if (jQelement.data('self')) {  // i lang non devo fare niente solo controllare l'attributo visible
				if (jQelement.data('template')) {
					$.renderJson(jQelement.data('template'), jQelement, data,data);
					//return ;
				}
	    	}
	    	*/
	    	if (jQelement.data('href')) {
	    		//log.info(data[jQelement.data('href')] + ":" + counter);
	    		//log.info(counter)
	    		var b = eval("with (data) { " + jQelement.data('href') + " }");
	    		jQelement.attr("href",b);
	    	}
	    	if (jQelement.data('id')) {
	    		var b = eval("with (data) { " + jQelement.data('id') + " }");
	    		jQelement.attr("id",b);
	    	}
	        if ( jQelement.data('remove') ) {

	        	var b = eval("with (data) { Boolean(" + jQelement.data('remove') + ") }");
	        	//log.info("data remove ",data,b);
	        	if (b)
	        		jQelement.remove();
	        }
	        if ( jQelement.data('class') ) {
	        	var b = eval("with (data) { " + jQelement.data('class') + " }");
	        	jQelement.attr("class",b);
	        }
	        if ( jQelement.data('addclass') ) {
	        	var b = eval("with (data) { " + jQelement.data('addclass') + " }");
	        	jQelement.addClass(b);
	        }
            if ( jQelement.data('visible') ) {
                var b = eval("with (data) { Boolean(" + jQelement.data('visible') + ") }");
                if (b)
                    jQelement.removeClass('hide');
                else
                    jQelement.addClass('hide');
            }
	        if (jQelement.data('attrs')) {
	        	var s = jQelement.data('attrs');

	        	var b = eval("with (data) { var myattrs=" + jQelement.data('attrs') + " }");
	        	for (var attr in myattrs) {
                    //se e' un attributo data- uso il JSON.stringify per preservare gli oggetti complessi
                    if (attr.indexOf('data-') >= 0 && ($.isArray(myattrs[attr]) || $.isPlainObject(myattrs[attr]) ) ) {
                        jQelement.attr(attr,JSON.stringify(myattrs[attr]) );
                    }
                    else
	                   jQelement.attr(attr,myattrs[attr]);
	        	}
	        	//var myattrs = JSON.parse(b);
	        	//console.log(myattrs);
	        }
	        if (jQelement.data('lang')) {
	        	var def = $.translate(jQelement.data('lang'));
	        	if (jQelement.is("input")) {
	    			jQelement.attr('value',def);
	            } else {
	            	jQelement.html(def);
	            }
	        }
	        if (jQelement.data('html')) {
	        	var b = eval("with (data) { " + jQelement.data('html') + " }");
	        	jQelement.html(b);
	        }
            if (jQelement.data('source') && !jQelement.data('field')) {
                // nel caso di oggetti con valori array se non e' stato settato il field li devo solo riempire (select)
                try {
                    var source = data[jQelement.data("source")];

                    var source_order = [];

                    if (jQelement.data("sourceorder")) {
                        source_order = data[jQelement.data("sourceorder")];
                    } else {
                        source_order = _.sortBy(_.keys(source), function (num) {
                            return num;
                        });
                    }
                    jQelement.html("");

                    for (var i = 0; i < source_order.length; i++) {
                        //for (var v in self.data.domainValues) {
                        var v = source_order[i];

                        //console.log('OPTIONS: ',v);
                        var selected = false;

                        if (v == fieldValue) {
                            selected = true;
                        }

                        var opt = $('<option>').attr({
                            value : v
                        });
                        if (selected)
                            opt.attr('selected','selected');
                        opt.html(source[v]);
                        jQelement.append(opt);

                    }


                } catch(e) {
                    log.error(e);
                }
            }
	        if (jQelement.data('video_icon')) {
	        	var values =data[jQelement.data('video_icon')];

	        	if ("string" == typeof values) {
	        		values = JSON.parse(values);
	        	}
	        	
	        	var thumb = "";
	        	if (values.kind && values.kind.indexOf('youtube') >= 0) {
	        		thumb = values.items[0].snippet.thumbnails.default.url;
	        	} else {
	        		thumb = values[0].thumbnail_small;
	        	}
	        	jQelement.attr("src",thumb);
	        }
	        if (jQelement.data('video_player')) {
	        	var values =data[jQelement.data('video_player')];
	        	var mode = jQelement.data('video_mode');
	        	if ("string" == typeof values) {
	        		values = JSON.parse(values);
	        	}
	        	var video_info = null;
	        	var provider = null;
	        	if (values.kind && values.kind.indexOf('youtube') >= 0) {
	        		video_info = values.items[0];
	        		provider = 'youtube';
	        	} else {
	        		video_info = json[0];
	        		provider = 'vimeo';
	        	}
	        	if (mode == 'dialog') {
	        		if (provider == 'youtube' ) {
	        			
		        		var dialog_data = {
		        				video_id : video_info.id,
		        				provider : 'youtube'
		        		}
		        		console.log(dialog_data)
		        		$(jQelement).attr('data-video_dialog_data',JSON.stringify(dialog_data));
	        		} else {
	        			alert('non implementato');
	        			return ;
	        		}
	        	} else {
	        		if (provider == 'youtube' ) {
	        		
		        		var url= "https://www.youtube.com/v/"+video_info.id;
	        			var id= "dy_"+ (new Date().getTime()) + "_" + (Math.floor(Math.random() * 10000));
	        			jQuery('<div/>', {
	        			    id: id,
	        			    class : 'hide'
	        			}).appendTo(jQelement);
	        			swfobject.embedSWF(url, id, "100%","100%","9.0.0");
	        		}
	        	}
	        	/*
	        	if (values.kind && values.kind.indexOf('youtube') >= 0) {
	        		var video_info = values.items[0];
        			
        			var destContainer = jQelement;
        			if (mode == "dialog") {
        				destContainer = $('#general_dialog .modal-body');
        			}
        			//var obj = $.createDynamicContainer();
        			var id= "dy_"+ (new Date().getTime()) + "_" + (Math.floor(Math.random() * 10000));
        			jQuery('<div/>', {
        			    id: id,
        			    class : 'hide'
        			}).appendTo(destContainer);
        			
        			if (mode == "dialog") {
        				var dialog_data = {
        						id : id,
        						url: url	
        				};
        				$(jQelement).attr('data-video_dialog_data',dialog_data);
        				
        				console.log("mode dialog");
        				$(jQelement).on('click',function () {
        					console.log("clickkkkk");
        					swfobject.embedSWF(url, id, w,h,version);
        					$('#general_dialog').modal('show');
        				});
    	        	} else {
    	        		swfobject.embedSWF(url, id, w,h,version);
    	        	}
    	        	
	        	} else {
	        		var video_info = json[0];
        			console.log(json);
        			var vimeo_html = '<iframe src="'+video_info.url +'"\
        				width="500"\
        				height="210"\
        				frameborder="0"\
        				webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p>\
        				<a href="'+video_info.url +'">Ascension</a> from \
        				<a href="'+video_info.subject_url +'">'+video_info.subject_name +'</a> on \
        				<a href="https://vimeo.com">Vimeo</a>.</p>';
        			$('#player_content').html(vimeo_html);
        			$('#player_video_dialog').modal('show');
	        	}*/
	        	
	        }
		} catch(e) {
			log.warn(sourceContainer, destContainer, data,father,jQelement.prop("tagName"));
			log.error(e);
		}
	};
	var bindEvents = function (container) {
		var evt_selectors = '[data-video_mode="dialog"]';
		$.each($(container).find(evt_selectors), function() {
			if ( $(this).data('video_mode')) {
				
				$(this).unbind('click');
				$(this).click(function () {
					console.log('click');
					var dialog_data = $(this).data('video_dialog_data');
					console.log(dialog_data);
					var id= "dy_"+ (new Date().getTime()) + "_" + (Math.floor(Math.random() * 10000));
					jQuery('<div/>', {
        			    id: id,
        			    class : 'hide'
        			}).appendTo('#generalDialog .modal-body');
					
					if (dialog_data.provider == 'youtube') {
						console.log('dsadsf')
						var url= "https://www.youtube.com/v/"+dialog_data.video_id;
	        			var w = "300px";
	        			var h = "200px";
	        			var version = "9.0.0";
	        			swfobject.embedSWF(url, id, w,h,version);
	        			$('#generalDialog').modal('show').ok(function () {
	        				$('#generalDialog .modal-body').html("");
	        				$('#'+id).remove();
	        			}).cancel(function () {
	        				$('#generalDialog .modal-body').html("");
	        				$('#'+id).remove();
	        			})
					}
				});
			}
		})
	}; 
	var sourceHtml =  $.getDomTemplate(sourceContainer).html();//$(sourceContainer).html();
	$(destContainer).html("");
	var selectors = "[data-field],[data-lang],[data-href],[data-id],[data-visible],[data-attrs],[data-class],[data-self],[data-addclass],";
	selectors += "[data-trim],[data-html],[data-remove],[data-source],[data-video_icon],[data-video_player]";
	//var selectors = "[data-field]";
    if (data instanceof Array) {
    	var startTime = new Date();
    	var tmpDiv = $.createDynamicContainer();
    	for (var k in data) {
    		tmpDiv.html(sourceHtml);
    		$.each(tmpDiv.find(selectors), function() {
				renderJsonElement($(this),data[k],k,data.length);
            });
    		$(destContainer).append(tmpDiv.html());
        }
    	bindEvents(destContainer);
    	var endTime = new Date();
    	var timeDiff = endTime - startTime;
		$.renderTimeAmount += (timeDiff /= 1000);
    	//log.info("RENDER TEMPLATE",timeDiff /= 1000);
    } else { // oggetto singolo
		var startTime = new Date();
        $(destContainer).append(sourceHtml);
        $.each($(destContainer).find(selectors), function() {
			renderJsonElement($(this),data,0,0);
        });
        bindEvents(destContainer);
		var endTime = new Date();
		var timeDiff = endTime - startTime;
		$.renderTimeAmount += (timeDiff /= 1000);
    }

};



/**
 * normalizza il template che contiene sotto template per gestire la ricorsione in caso di
 * template e dati con vettori di vettori
 * @param id : id del template iniziale
 */
$.normalizeTemplate = function (id) {
	var containers = [];

	var _createTemplate = function (html) {
	    jQuery('<div/>', {
	        id: 'self_'+containers.length,
	        class : 'hide'
	      }).appendTo('body');
	      var tmpC = $('#self_'+containers.length);
	      tmpC.html(html);
	      containers.push('#'+tmpC.attr('id'));
	      return tmpC;
	}

	var _normalizeRecursive = function (jQE) {
		//console.log(jQE.attr('id') +  " length " + jQE.find('[data-self]').length)
		if (jQE.find('[data-self]').length == 0) {
			var tmpC = _createTemplate(jQE.html());
			jQE.html("");
			jQE.attr('data-self','#'+tmpC.attr('id'))
			return 1;
	    }

	    $.each(jQE.find('[data-self]'),function () {
	    	var caso_base = _normalizeRecursive($(this));
	    	if (!caso_base) {
	    		var tmpC =_createTemplate($(this).html());
	    		$(this).html("");
	    		$(this).attr('data-self','#'+tmpC.attr('id'));
	    	}
	    });
	    return 0;
	}
	if ($(id).find('[data-self]').length == 0)
		return containers;

	_normalizeRecursive($(id));
	return containers;
}

/**
 * renderizza un template sorgente con i dati attraverso l'utilizzo di dati e
 * gli attributi di configurazione del render stesso.
 * @param sourceSelector : selettore template sorgente
 * @param destSelector : selettore template destinazione
 * @param data : vettore associativo dei dati da utilizzare nel render
 */
$.renderTemplate = function (sourceSelector,destSelector,data) {
	var mainC = $.createDynamicContainer(sourceSelector);
	var containers = $.normalizeTemplate('#'+mainC.attr('id'));
	$.renderJson('#'+mainC.attr('id'),destSelector,data);
	for (var c in containers) {
		$(containers[c]).remove();
	}
	mainC.remove();
}

$.getTemplate = function (sourceSelector,data) {
	var mainD = $.createDynamicContainer();
	$.renderTemplate(sourceSelector, '#'+mainD.attr('id'), data);
	var html = mainD.html();
	mainD.remove();
	return html;
}

$.parseTemplate = function(html, token) {

    var self = this;
    self._replaceAll = function(Source, stringToFind, stringToReplace) {
    	if (!Source)
    		return "Invalid template source";
        if (stringToReplace === null) {
            stringToReplace = '';
        }
        var temp = Source;

        var index = temp.indexOf(stringToFind);
        while (index != -1) {
            temp = temp.replace(stringToFind, stringToReplace);
            index = temp.indexOf(stringToFind);
            //console.log(index);
        }
        return temp;
    };
    try {
        $.each(token, function(key, value) {

            html = self._replaceAll(html, "[" + key + "]", value);//html.replace(new RegExp("\["+key+"\]", 'g'),value);
        });
        var tagjs = {'tagjs': '<script>', '/tagjs': '</script>'};
        $.each(tagjs, function(key, value) {

            html = self._replaceAll(html, "[" + key + "]", value);//html.replace(new RegExp("\["+key+"\]", 'g'),value);
        });
    } catch (e) {
        alert(e.message);
    }
    return html;
};

/**
 * @param upload_field: il controllo upload
 * @callback : funzione richiamata in automatico
 * viene chiamata la callback appena l'utente ritorna dalla selezione di un file
 * associato all'input di controllo upload_field
 */
$.fn.autoUpload = function (callback) {
	$(this).change(callback);

	/* TODO compatibilita' verso ie browser?
	if ($.browser.msie)
	{
	    // IE suspends timeouts until after the file dialog closes
		$(this).click(function(event)
	    {
	        setTimeout(function()
	        {
	            if($(this).val().length > 0) {
	            	callback();
	            }
	        }, 0);
	    });
	}
	else
	{
	    // All other browsers behave
		$(this).change(callback);
	}
	*/
};

// ______________________________________________________________________________
// _______________________________ dialogs ____________________________________
// ______________________________________________________________________________

var __cupparisDialog = {

    _msgToString : function (msg) {
        if (msg && ($.type(msg) == 'array') ) {
            msg = msg.join("<br>");
        }
        return msg;
    },

    _showDialog : function (id,msg) {
        var self = this;
        if ( ($(id).data('bs.modal') || {}).isShown ) {
            $(id + " .msg").html(self._msgToString(msg));
            return $(id);
        }
        $(id + " .msg").html($._msgToString(msg));
        $(id).find('.btok').unbind();
        $(id).find('.btcancel').unbind();
        $(id).modal({backdrop:false,show:true});
        return $(id);
    },

    errorDialog : function(msg) {
        if (!msg) {
            log.error('Errore con messaggio vuoto');
            return ;
        }
        return this._showDialog('#errorDialog',msg);
    },

    messageDialog : function (msg) {
        return this._showDialog('#messageDialog',msg);
    },

    confirmDialog : function (msg) {
        return this._showDialog('#confirmDialog',msg);
    }
};

$._msgToString = function (msg) {
    console.log("_msgToString",msg);
	var m = "No message";
	if (msg) {
    	if ($.type(msg) == 'string')
            m = msg;
        else if ($.type(msg) == 'array')
            m = msg.join("<br>");
    }
	return m;
};

$.errorDialog = function(msg) {
    return __cupparisDialog.errorDialog(msg);
};

$.messageDialog = function(msg) {
    return __cupparisDialog.messageDialog(msg);
};


$.confirmDialog = function(msg) {
    return __cupparisDialog.confirmDialog(msg);
};


$.progressDialog = function(msg, value) {

    var prg_popup = '#progress_dialog';
    $(prg_popup + " .modal-title ").text(msg);
    if (value === false || value === undefined) {
        $(prg_popup + " .progress").css("width", "100%");
        $(prg_popup + " .progress-bar ").text(msg);

    } else {
        $(prg_popup + " .progress").css("width", value + "%");
        $(prg_popup + " .progress-bar ").text(value + "%");
    }
    $(prg_popup).find('.btok').unbind();
	$(prg_popup).find('.btcancel').unbind();
    $(prg_popup).modal('show');
    return $(prg_popup);
};

$.progressDialogClose = function () {
	var prg_popup = '#progress_dialog';
	$(prg_popup).modal("hide");
	return $(prg_popup);
};



$.waitDialogOpen = function(msg) {
    var wait_popup = '#waitDialog';
    $(wait_popup + " .modal-title").html($._msgToString(msg));
    $(wait_popup).find('.btok').unbind();
	$(wait_popup).find('.btcancel').unbind();
    $(wait_popup).modal('show');
    return $(wait_popup);
};

$.generalDialog = function(body,options) {
    var dlg = '#generalDialog';
    if (body)
    	$(dlg + " .modal-body").html(body);
	$(dlg).find('.btok,.btcancel').attr('data-dismiss','modal');
	$(dlg).find('.alert').addClass('hide').html("");
    var opts = options?options:{};
    if (opts.title)
    	$(dlg + " .modal-title").html(opts.title);
    if (opts.hide_buttons)
    	$(dlg + " .modal-footer").addClass("hide");
    else
    	$(dlg + " .modal-footer").removeClass("hide");
    if (opts.btok_label)
    	$(dlg + " .modal-footer").find('.btok').html(opts.btok_label);
    if (opts.btcancel_label)
    	$(dlg + " .modal-footer").find('.btcancel').html(opts.btcancel_label);
	if (opts.autohide == false) {
		$(dlg).find('.btok,.btcancel').attr('data-dismiss','');
	}
    $(dlg).find('.btok').unbind();
	$(dlg).find('.btcancel').unbind();
    $(dlg).modal({backdrop:false,show:true});
    return $(dlg);
};

$.generalDialog.showError = function (msg) {
	var dlg = '#generalDialog';
	$(dlg + " [data-modal_error]").removeClass('hide').html(msg);
}

$.generalDialog.hideError = function () {
	var dlg = '#generalDialog';
	$(dlg + " [data-modal_error]").addClass('hide').html('');
}


$.getFailMessage = function (e) {
	
	try {
		if ($.isProduction)
			return e.status + " " + e.statusText;
		var msg =  e.status + " " + e.statusText + "<br>";
		if ( e.responseJSON) {
			msg += e.responseJSON.error.message + "<br>";
			msg += "line :" + e.responseJSON.error.line + "<br>";
			msg += e.responseJSON.error.file ;
		}
		return msg;
	} catch(em) {
		return ""+em;
	}

};

$.waitDialogClose = function() {
    var wait_popup = '#waitDialog';
    $(wait_popup).modal("hide");
    return $(wait_popup);
};
/**
 * @param titles: array of {dialog:'dialogName',options: {title:'window title'}  }
 */
$.dialogsOption = function(options) {
    for (var i in options) {
        var opt = options[i];
        if (!opt.dialog)
            continue;
        $('#' + opt.dialog).find(".modal-title").html(opt.options.title);
    }
};

$(function() {
    $.containerInit();
});
/**
 * VERSIONE LIBRERIA 3.0
 */
var BaseElement = Class.extend({
    _modeValidateFunctionName : {
        'view'   : '_validateView',
        'edit'   : '_validateEdit',
        'search' : '_validateSearch'
    },
    _modeRenderFunctionName : {
        'view'   : '_renderView',
        'edit'   : '_renderEdit',
        'search' : '_renderSearch'
    },
    _modeFinalizeFunctionName : {
        'view'   : '_finalizeView',
        'edit'   : '_finalizeEdit',
        'search' : '_finalizeSearch'
    },
});
BaseElement.VIEW = 'view';
BaseElement.EDIT = 'edit';
BaseElement.SEARCH = 'search';

var Render = BaseElement.extend({
    key : null,                 // chiave dell'oggetto render (il campo del db)
    type : null,                // type dell'oggetto per gestire le Gerarchie di classi
    className : 'Render',       // nome della Classe reale dell'oggetto
    classData : null,           // nome per il tipo di caricamento dati e config da utilizzare nelle views
                                // per permettere caricamenti custom per oggetti particolari
    classTemplate : null,       // nome utilizzato per la composozione del templateid da caricare
    prefixTemplateClass : 'default',    // prefisso utilizzato per la costruzione del template id

    element_selector : '[data-render_element]',
    control_selector : '[data-render_control]',
    caption_selector : '[data-render_caption]',
    modes : ['edit','view','search'],           // modi accettati
    value : null,           // valore oggetto
    mode : 'edit',          // modo in edit controllo di form, default edit
    templateId : null,      // id del template sorgente da renderizzare,
    templateItemId : null,  // id del template in caso di oggetti che sono vettori di valori
    container : null,       // id del container html dove verrà renderizzato l'oggetto Render


    // costruttore
    init : function (key,attributes) {
        this.key = key;
        this.attrs(attributes);
    },

    attrs : function (attrs) {
        var self = this;
        if (attrs) {
            for (var k in attrs) {
                // if (_.isFunction(attrs[k])) {
                //     self.prototype[k] = attrs[k];
                // } else
                    self[k] = attrs[k];
            }
            return self;
        }
        // se attrs non settato si vogliono leggere gli attributi
        var attrs = [];
        for(var k in window[self.className].prototype) {
            // rimuovo i campi speciali
            if ($.inArray(k,['type','_modeRenderFunctionName','_modeFinalizeFunctionName','modes','_modeValidateFunctionName']) >= 0)
                continue;
            if (_.isFunction(self[k])) {
                //log.info('function ' + i);
            } else if (_.isObject(self[k]) ) {
                attrs.push(k);
            } else {
                //log.info('attribute ' + i);
                attrs.push(k);
            }

        }
        return attrs;//_.sortBy(attrs);
    },
    /**
     * esegue il render dell'oggetto chiamando il metodo _render
     * @param [container]: opzionale,se passato assegna l'html generato
     * @return stringa contenente l'html generato
     **/
    render : function (container) {
        var self = this;
        var obj = self._getTemplate();
        if (obj.children().length > 0) {
            $(obj.children()[0]).attr('data-render_id',self.key);
        }
        if (!_.isFunction(self[self._modeRenderFunctionName[self.mode] ]))
            throw self.type + "." + self._modeRenderFunctionName[self.mode] +  " not implemented";

        self[self._modeValidateFunctionName[self.mode] ](obj);
        //try {
        self[self._modeRenderFunctionName[self.mode] ](obj);
        //} catch (e) {
        //console.error(e);
        //throw self.type + "." + self.modeRenderFunctionName[self.mode]  + " error! ->  " + e.message;
        //   return;
        //}
        //self._render(obj)
        var html = obj.html();
        if (container) {
            self.container = container;
        }
        if (self.container)
            $(self.container).html(html);
        obj.remove();
        return html;
    },
    /**
     * esegue il finalize dell'html chiamando il metodo _finalize
     * usare _finalize per la generazione di eventi o gestione del codice html
     * @param callback : [opzionale] callaback chiamata alla fine del finalize
     **/
    finalize : function (callback) {
        var self = this;
        callback = callback || function () {};
        if (!_.isFunction(self[self._modeFinalizeFunctionName[self.mode] ])) {
            log.warn('is not function ' + self.type+ "." + self._modeFinalizeFunctionName[self.mode] );
            return callback();
            //throw self.type + "." + self.modeFinalizeFunctionName[self.mode] +  " not implemented";
        }
        //try {
        self[self._modeFinalizeFunctionName[self.mode] ]();
        //} catch (e) {

        //    throw self.type + "." + self.modeFinalizeFunctionName[self.mode]  + " error! ->  " + e.message;
        //    return;
        //}


        //self._finalize();
        return callback();
    },

    /**
     * setta il valore nel controllo html dell'oggetto render
     */
    setValue : function (value) {
        var self = this;
        var renderClass = "Render" + Utility.pascalCase(self.type);
        if (!_.isFunction(self['_set'+renderClass+"Value"]))
            throw '_set'+renderClass+"Value" + " not yet implemented";
        self['_set'+renderClass+'Value'](value);
    },

    _setRenderTextareaValue : function (value) {
        var self = this;
        log.debug('_setRenderTextareaValue')
        $(self.container).find('textarea[name="'+self.key+'"]').html(value);
    },

    _setRenderInputValue : function (value) {
        var self = this;
        log.info('_setRenderInputValue',$(self.container).find('input[name="'+self.key+'"]'))
        $(self.container).find('input[name="'+self.key+'"]').attr('value',value).val(value);
    },
    /**
     * ritorna il valore a runtime dentro html del campo associato al render
     */
    getValue : function () {
        var self = this;
        if (!self.container)
            return null;
        switch(self.type) {
            case 'text':
                return $(self.container).find(self.control_selector).html();
            case 'input':
            case 'select':
                return $(self.container).find(self.control_selector).val();
            case 'decimal':
                if (self.mode == self.VIEW)
                    return self.data.value
                return $(self.container).find(self.control_selector).val();
            case 'choice':
                if (self.choiceType == 'checkbox') {
                    var allVals = [];
                    $(self.container).find(self.control_selector+":checked").each(function() {
                        allVals.push($(this).val());
                    });
                    return allVals;
                }
                //log.info(self.container,self.control_selector+":checked");
                return $(self.container).find(self.control_selector+":checked").val();
            case 'textarea':
                return $(self.container).find(self.control_selector).html();
            case 'swap':
                return self.data.value;
        }
        throw 'Render' + self.type +'.getValue not implemented';

        // vecchio codice
        // in caso di lista di valori devo cercare il valore nel subset dato dall'id (numero riga) dell'oggetto render nella view
        var subset = $(self.container).find('[data-render_id="' + render_id + '"]');

        var container = subset.length > 0 ? subset:$(self.container);
        var selector = "";
        switch(self.cfield.type) {
            case 'input':
            case 'select':
                selector = self.cfield.type+'[name="'+self.key+'"]';
                break;
            case 'date_picker':
                selector = 'input[name="'+self.key+'"]';
                break;
        }
        console.log(self.cfield.type,container,selector);
        return $(container).find(selector).val();
    },

    _getTemplate : function () {
        var self = this;
        var tplId = self.templateId;
        if (!tplId) {
            var firstTpl = '#'+self.prefixTemplateClass+"_"+self.classTemplate+"_"+self.mode+"_tpl";
            var secondTpl = '#'+self.prefixTemplateClass+"_"+self.classTemplate+"_tpl";
            tplId = firstTpl;
            if ($(firstTpl).length == 0) {
                tplId = secondTpl;
                if ($(secondTpl).length == 0) {
                    throw self.key + " template source " + firstTpl + " and alternative template " + secondTpl + " Not found ";
                }
            }

        }

        return $.createDynamicContainer(tplId);
    },

    _validateEdit : function() {
        return true;
    },
    _validateView : function() {
        return true;
    },
    _validateSearch : function() {
        return true;
    },
    // --- abstract metod
    // obsoleti
    /**
     * metodo da overloadare che verra' richiamato in seguito dall'oggetto Render.
     * @param jQe : elemento jquery contenente il template sorgente

    _render : function (jQe) {
        throw '_render Not implemented';
    },

    _finalize : function () {
        throw '_finalize Not implemented';
    },

     */
    _emitEvent : function (eventName,params) {
        var self = this;
        //log.debug("emit",eventName,params);
        var evt = new RenderEvent(eventName,self.type);
        evt.params = params;
        evt.key = self.key;
        self.fireEvent(evt);
    },

    // --- events ------
    fireEvent : function (evt) {
        var self = this;
        log.warn("Render.fireEvent " + evt.eventName + " of " + evt.type + " not overloaded");
        return ;
    },


    /**
     * ritorna il container su cui andare a cercare eventuali controlli o pezzi di html dell'oggetto render
     * controlla se l'oggetto e' in una lista o no in quel caso prende come container una subarea

     getContainer : function () {
        var self = this;
        var container =  $(self.container);
        if (self.index) {
            container =  $(self.container).find('[data-render_id="' + self.index + '"]');
        }
        return container;
    },
     setCustomData : function (data) {
        var self = this;
        self.custom = true;
        self.customData = data;
        self.container = data.container;
        self.value = data.value;

    },
     hasCustomData : function () {
        var self = this;
        return (Object.keys(self.customData).length > 0) || self.custom;
    }
     */
});

Render.factory = function (key,config,type) {
    if (!type)
        type = 'input';
    var r = null;
    var className = "Render" + Utility.pascalCase(type);
    try {
        // estendo la classe per il supporto dell'overloading dei metodi passati in config;
        var localClass = window[className].extend(config);
        r = new localClass(key);
        r.className = className;
        if (!r.classData) {
            r.classData = type;
        }
        if (!r.classTemplate) {
            r.classTemplate = type;
        }
        
        // vecchio codice
        // r = new window[className](key,config);
        // r.className = className;
        // if (!r.classData) {
        //     r.classData = type;
        // }
        // if (!r.classTemplate) {
        //     r.classTemplate = type;
        // }
    } catch(e) {
        log.error(className,key,config,type,e);
        throw e;
    }
    return r;
}
/*
Render.objType = function (type) {
    var objType = null;
    try {
        objType = window["Render" + Utility.pascalCase(type)].prototype.type;
    } catch (e) {
        log.error("Render"+ Utility.pascalCase(type) + " " +  e);
        throw e;
    }
    return objType;
}

 */
Render.getClassName = function (type) {
    var className = null;
    try {
        className = "Render" + Utility.pascalCase(window["Render" + Utility.pascalCase(type)].prototype.className);
    } catch (e) {
        log.error("Render"+ Utility.pascalCase(type) + " " +  e);
        throw e;
    }
    return className;
}


Render.getClassData = function (type) {
    var classData = null;
    try {
        classData = "Render" + Utility.pascalCase(window["Render" + Utility.pascalCase(type)].prototype.classData);
    } catch (e) {
        log.error("Render"+ Utility.pascalCase(type) + " " +  e);
        throw e;
    }
    return classData;
}

Render.tinymceConfig = {
    forced_root_block : '',
};

Render.mymap = null;

Render.uid = 0;
/**
 * VERSIONE LIBRERIA 3.0
 */
var RenderEvent = Class.extend({
    eventName : null,
    type :null,
    pk : null,
    params : null,
    key : null,
    init : function (eventName,type,pk,key,params) {
        this.eventName = eventName;
        this.type = type;
        this.pk = pk;
        this.params = params;
        this.key = key;
    }
});
/**
 * VERSIONE LIBRERIA 3.0
 */
/**
 * RenderInput
 * campi in piu' in config rispetto alla class Render di default
 * config.operator : valore dell'operatore search
 **/
var RenderInput = Render.extend({
    inputType : 'text',
    type : 'input',
    classData : 'input',
    classTemplate : 'input',
    operator : null,
    htmlAttributes : {},
/*    init : function (key,attributes) {
        this.htmlAttributes = {};
        this._super(key,attributes);
    },*/
    _renderSearch : function (jQe) {
        var self = this;
        var el = jQe.find(self.control_selector);
        el.attr("type",self.inputType);
        el.attr("name", 's_' + self.key + '[]');
        el.attr("value", self.value);
        $('<input>').attr({
            type: 'hidden',
            name: 's_' + self.key + "_operator",
            'data-control_operator' : self.key,
            value : self.operator
        }).appendTo(jQe);
        self._setHtmlAttributes(jQe);
    },
    _finalizeSearch : function (){} ,
    _renderEdit : function (jQe) {
        var self = this;
        var el = jQe.find(self.control_selector);
        el.attr("type",self.inputType);
        el.attr("name", self.key);
        el.attr("value", self.value);
        self._setHtmlAttributes(jQe);
    },
    _renderView : function (jQe) {
        var self = this;
        self._renderEdit(jQe);
    },
    _finalizeView : function(){},
    _finalizeEdit : function(){
        var self = this;
        $(self.container).find(self.control_selector).change(function() {
            self._emitEvent('change',$(this).val());
        });
    },
    _setHtmlAttributes : function(jQe) {
        var self = this;
        var el = jQe.find(self.control_selector);
        for(var k in self.htmlAttributes) {
            el.attr(k,self.htmlAttributes[k]);
        }
    }
});

/**
 * VERSIONE LIBRERIA 3
 */
var RenderText = Render.extend({
    type : 'text',
    classData : 'text',
    classTemplate : 'text',
    mode : BaseElement.VIEW,

    setValue : function(value) {
        var self = this;
        $(self.container).find(self.element_selector).html(value);
    },

    getValue : function() {
        var self = this;
        return $(self.container).find(self.element_selector).html();
    },

    _renderView : function (jQe) {
        var self = this;
        $(jQe).find(self.element_selector).html(self.value);
    },
    //_finalizeView : function(){},

    _renderEdit : function(jQe) {
        this._renderView(jQe);
    },
    _renderSearch : function (jQe) {
        this._renderView(jQe);
    },
    //_finalizeSearch : function (){}

});
/**
 * VERSIONE LIBRERIA 3
 */
var RenderTextarea = Render.extend({
    type : 'textarea',
    classData : 'textarea',
    classTemplate : 'textarea',
    _renderEdit : function (jQe) {
        var self = this;
        var el = jQe.find(self.control_selector);
        el.attr("name", self.key);
        el.html(self.value);
    },
    _finalizeEdit : function(){},

    _renderView : function (jQe) {
        this._renderEdit(jQe);
    },
    _finalizeView : function(){}
});

/**
 * VERSIONE LIBRERIA 3
 */

/**
 * RenderSelect
 * campi in piu' rispetto alla class Render
 * data.domainValues : dominio dei valori possibili della select
 * data.operator : valore dell'operatore search
 * config.multiple : determina se la select box e' multivalore
 **/
var RenderSelect = Render.extend({
    type : 'select',
    classData : 'select',
    classTemplate : 'select',
    multiple : false,
    domainValuesOrder : null,
    domainValues: {},
    operator : null,

    _setData : function (jQe) {
        var self = this;
        var el = jQe.find(self.control_selector);
        if (self.multiple)
            el.attr("multiple", "multiple");

        //ORDINAMENTO DELLE OPTIONS
        var vs = [];
        if (self.domainValuesOrder) {
            vs = self.domainValuesOrder;
        } else {
            vs = _.sortBy(_.keys(self.domainValues), function (num) {
                return num;
            });
        }

        el.html('');
        for (var i = 0; i < vs.length; i++) {
            //for (var v in self.data.domainValues) {
            var v = vs[i];

            //console.log('OPTIONS: ',v);
            var selected = false;
            if (self.multiple) {
                if ($.inArray(v, self.value) >= 0) {
                    selected = true;
                }
            } else {
                if (v == self.value) {
                    selected = true;
                }
            }
            var opt = $('<option>').attr({
                value : v
            });
            if (selected)
                opt.attr('selected','selected');
            opt.html(self.domainValues[v]);
            el.append(opt);
        }
        el.attr("value", self.value);
    },
    _renderSearch : function (jQe) {
        var self = this;
        self._setData(jQe);
        var el = jQe.find(self.control_selector);
        el.attr("name", 's_' + self.key + '[]');
        $('<input>').attr({
            type: 'hidden',
            name: 's_' + self.key + "_operator",
            'data-control_operator' : self.key,
            value : self.operator
        }).appendTo(jQe);
    },
    _renderEdit : function (jQe) {
        var self = this;
        self._setData(jQe);
        var el = jQe.find(self.control_selector);
        var name = self.key;
        var exists = self.key.indexOf('[]') > 0?self.key.slice(0,-2)+'_exists[]':self.key+'_exists';
        if (self.multiple){
            name += '[]';
        }
        el.attr("name", name);
        // creazione campo nascosto per checkare la presenza del campo
        $('<input>').attr({
            type: 'hidden',
            name: exists,
            value : 1
        }).appendTo(jQe);
    },
    _finalizeEdit : function(){
        var self = this;
        $(self.container).find(self.control_selector).change(function() {
            self._emitEvent('change',$(this).val());
        });
    },
    _finalizeSearch : function(){
        var self = this;
        $(self.container).find(self.control_selector).change(function() {
            self._emitEvent('change',$(this).val());
        });
    },
    _finalizeView : function(){},

    setDomainValues : function (values,valuesOrder) {
        var self = this;
        self.domainValues = values;
        if (valuesOrder) {
            self.domainValuesOrder = valuesOrder;
        } else {
            self.domainValuesOrder = null;
        }
        self._setData(self.container);
    },
    setValue : function(value) {
        var self = this;
        $(self.container).find(self.control_selector).val(value).change();
    }
});
/**
 * VERSIONE LIBRERIA 3
 */
var RenderChoice = Render.extend({
    type : 'choice',
    classData : 'choice',
    classTemplate : 'choice',
    choiceType : null,
    operator : null,
    domainValuesOrder : null,
    domainValues: null,

    _validateEdit : function () {
        var self = this;
        if (!self.domainValues || Object.keys(self.domainValues).length == 0 )  {
            self.domainValues = {1 : "Si",0 : "No"};
            log.warn("RenderChoice " + self.key + " no domainValues found use default",self.domainValues);
        }
        return true;
    },
    _renderEdit : function (jQe) {
        var self = this;
        var name = self.key;
        if (self.choiceType == 'checkbox')
            name+="[]";
        var exists = self.key.indexOf('[]') > 0?self.key.slice(0,-2)+'_exists[]':self.key+'_exists';
        if (self.multiple){
            name += '[]';
        }
        self._setData(jQe,name);
        var el = jQe.find(self.element_selector);
        $('<input>').attr({
            type: 'hidden',
            name: exists,
            value : 1
        }).appendTo(jQe);
    },
    _renderSearch : function(jQe) {
        var self = this;
        self._setData(jQe,'s_' + self.key + '[]');
        var el = jQe.find(self.element_selector);
        $('<input>').attr({
            type: 'hidden',
            name: 's_' + self.key + '_operator',
            'data-control_operator' : self.key,
            value : self.operator
        }).appendTo(jQe);
    },

    _setData : function (jQe,inputName) {
        var self = this;
        var el = jQe.find(self.element_selector);
        switch(self.choiceType ) {
            case 'checkbox':
            case 'radio':
                var localEl = el;

                //ORDINAMENTO DELLE CASELLE
                var vs = [];
                if (self.domainValuesOrder) {
                    vs = self.domainValuesOrder;
                } else {
                    vs = _.sortBy(_.keys(self.domainValues), function (num) {
                        return num;
                    });
                }

                for (var j = 0; j < vs.length; j++) {
                    //for (var v in self.data.domainValues) {
                    var v = vs[j];
                    var selected = false;
                    if (j>0) {
                        localEl = localEl.clone().appendTo(el.parent());
                    }
                    if (self.choiceType == 'checkbox') {
                        if ($.inArray(v, self.value) >= 0) {
                            selected = true;
                        }
                    } else {
                        if (v == self.value) {
                            selected = true;
                        }
                    }
                    //var name = self.key;
                    //if (self.config.mode == Render.SEARCH)
                    //    name = 's_' + self.key + '[]';
                    localEl.find(self.control_selector).attr('name',inputName).attr('value',v).attr('type',self.choiceType);
                    localEl.find(self.caption_selector).html(self.domainValues[v]);
                    localEl.addClass(self.choiceType);
                    if (selected ) {
                        localEl.find(self.control_selector).attr("checked", "checked");
                    } else {
                        localEl.find(self.control_selector).removeAttr("checked");
                    }
                }
                break;
            default:
                throw "choiceType " + self.choiceType +  " RenderChoice not implemented";
                break;
        }
    },
    _finalizeEdit : function(){},
    _finalizeSearch : function (){}
});
/**
 * VERSIONE LIBRERIA 3
 */

var RenderImage = Render.extend({
    type : 'image',
    classData : 'image',
    classTemplate : 'image',
    imageTemplate : null,
    mode : BaseElement.VIEW,
    _renderView : function (jQe) {
        var self = this;
        var src = self.value
        if (self.imageTemplate) {
            if (src[src.length-1] != '/')
                src += '/';
            src += self.imageTemplate;
        }
        jQe.find(self.control_selector).attr('src',src);
    },
    _finalizeView : function(){},
    getValue : function () {
        return $(this.container).find(this.control_selector).attr('src');
    }
});
/**
 * VERSIONE LIBRERIA 3
 */
var RenderTime = Render.extend({
    type : 'time',
    classData : 'time',
    classTemplate : 'time',
    hour_selector : "[data-render_hour]",
    minute_selector : "[data-render_minute]",
    second_selector : "[data-render_second]",

    _renderEdit : function(jQe) {
        var self = this;
        self._setData(jQe,self.key)
    },
    _renderSearch : function(jQe) {
        var self = this;
        self._setData(jQe,'s_' + self.key + '[]');
        $('<input>').attr({
            type: 'hidden',
            name: 's_' + self.key + "_operator",
            'data-control_operator' : self.key,
            value : self.operator
        }).appendTo(jQe);
    },
    _setData : function (jQe,inputName) {
        var self = this;
        var el = jQe.find(self.element_selector);
        el.find(self.control_selector).attr("name", inputName);
        el.find(self.control_selector).attr("value", self.value);
        var elH = el.find('[data-render_hour]');
        for (var i=0;i<24;i++) {
            var v = i>=10?i:'0'+i;
            var opt = $('<option>').attr({
                value : v
            });
            opt.html(v);
            elH.append(opt);
        }
        var elM = el.find(self.minute_selector);
        var elS = el.find(self.second_selector);
        for (var i=0;i<60;i++) {
            var v = i>=10?i:'0'+i;
            var optm = $('<option>').attr({
                value : v
            });
            var opts = $('<option>').attr({
                value : v
            });
            optm.html(v);
            opts.html(v);
            elM.append(optm);
            elS.append(opts);
        }
        //el.find(self.hour_selector).attr('data-render_hour', self.key);
        //el.find(self.minute_selector).attr('data-render_minute', self.key);
        //el.find(self.second_selector).attr('data-render_second', self.key);
    },
    _finalizeEdit : function () {
        var self = this;
        $(self.container).find(self.hour_selector+","+ self.minute_selector + "," + self.second_selector).change(function () {
            var stime = $(self.container).find(self.hour_selector).val() + ":"
                        + $(self.container).find(self.minute_selector).val() + ":"
                        + $(self.container).find(self.second_selector).val();
            $(self.container).find(self.control_selector).val(stime);
        });
        try {
            var t = $(self.container).find(self.control_selector).val().split(":");
            $('[data-render_hour="' + self.key + '"]').val(t[0]);
            $('[data-render_minute="' + self.key + '"]').val(t[1]);
            $('[data-render_second="' + self.key + '"]').val(t[2]);
        } catch (e) {
            log.error(e);
        }

        /*
        $(self.container).find('[data-render_hour="' + self.key + '"],[data-render_minute="' + self.key + '"],[data-render_second="' + self.key + '"]').change(function () {
            var stime = $('[data-render_hour="' + self.key + '"]').val() + ":" + $('[data-render_minute="' + self.key + '"]').val() + ":" + $('[data-render_second="' + self.key + '"]').val();
            $(self.container).find(self.control_selector).val(stime)
        });
        try {
            var t = $(self.container).find(self.control_selector).val().split(":");
            $('[data-render_hour="' + self.key + '"]').val(t[0]);
            $('[data-render_minute="' + self.key + '"]').val(t[1]);
            $('[data-render_second="' + self.key + '"]').val(t[2]);
        } catch (e) {
            log.error(e);
        }
        */
    },
    _finalizeSearch : function (){},

    getValue : function () {
        return $(this.container).find(this.control_selector).val();
    }
});
/**
 * VERSIONE LIBRERIA 3
 */
var RenderSwap = Render.extend({
    type : 'swap',
    classData : 'swap',
    classTemplate : 'swap',
    classTrue : "text-success",
    classFalse : "text-danger",
    title : 'Attiva/Disattiva',
    domaniValues : null,

    _setHtmlData :function(jQe) {
        var self = this;
        var el = jQe.find(self.control_selector);
        el.attr('title',self.title);
        if (!self.domaniValues) {
            if (self.value === true || self.value === false) {
                if (self.value) {
                    jQe.find('i').removeClass(self.classFalse);
                    jQe.find('i').addClass(self.classTrue);
                } else {
                    jQe.find('i').removeClass(self.classTrue);
                    jQe.find('i').addClass(self.classFalse);
                }
            } else {
                if (parseInt(self.value)) {
                    jQe.find('i').removeClass(self.classFalse);
                    jQe.find('i').addClass(self.classTrue);
                } else {
                    jQe.find('i').removeClass(self.classTrue);
                    jQe.find('i').addClass(self.classFalse);
                }
            }
            return ;
        }
        jQe.find('i').removeClass(self.classFalse);
        jQe.find('i').addClass(self.classTrue);

        var values = _.keys(self.domainValues);
        if (values.length <= 2) {
            log.warn("domain values lenght < 2");
            return ;
        }
        var txt = self.domainValues[values[0]];
        if (self.value == values[1]) {
            txt = self.domainValues[values[1]];
            jQe.find('i').addClass(self.classFalse);
            jQe.find('i').removeClass(self.classTrue);
        }
        jQe.find('i').html('&nbsp;'+txt);

    },
    _renderView : function (jQe) {
        this.value = parseInt(this.value);
        this._setHtmlData(jQe);
    },
    _renderEdit : function (jQe) {
        this._setHtmlData(jQe);
    },
    _finalizeEdit : function() {
        var self = this;
        var jQe = $(self.container);
        var el = jQe.find(self.control_selector);
        el.click(function () {


            if (! self.domainValues ) {
                if (self.value === true || self.value === false) {
                    self.value = ! self.value;
                } else
                    self.value = parseInt(self.value) == 1?0:1;
            } else {
                var values = _.keys(self.domainValues);
                if (self.value == values[0])
                    self.value = values[1];
                else
                    self.value = values[0];
            }
            //log.debug("To " , self.data.value);
            self._setHtmlData(jQe);
            self._emitEvent('change',self.value);
        })
    },
    _finalizeView : function(){},
    getValue : function () {
        return this.value;
    }
});
/**
 * VERSIONE LIBRERIA 3
 */
var RenderCustom = Render.extend({
    type : 'custom',
    classData : 'custom',
    classTemplate : 'custom',
    html : null,
    _renderEdit : function (jQe) {
    },
    _renderView : function (jQe) {
    },
    _renderSearch : function (jQe) {
    },
    _finalizeEdit : function(){
        this._customRender();
    },
    _finalizeView : function() {
        this._customRender();
    },
    _finalizeSearch : function () {
        this._customRender();
    },
    _customRender : function () {
        var self = this;
        if (self.html) {
            if (_.isFunction(self.html)) {
                $(self.container).html(self.html.apply(self));
            } else {
                $(self.container).html(self.html);
            }

        }
    },
    getValue : function () {
        return $(this.container).html();
    },
    setValue : function(value) {
        $(this.container).html(value);
    }
});
/**
 * VERSIONE LIBRERIA 3
 */
/**
 * renderizza il decimale in due controlli distinti
 **/
var RenderDecimal = Render.extend({
    int_selector    : '[data-render_control_int]',
    dec_selector    : '[data-render_control_dec]',
    symbol_selector : '[data-render_symbol]',
    type : 'decimal',
    classData : 'decimal',
    classTemplate : 'decimal',
    digits : 2,
    symbol : null,
    symbol_position : 'left',
    separator : ",",

    _splitNumber : function () {
        var self = this;
        var value = parseFloat(self.value);
        if (isNaN(value )) {
            self.value = 0;
            return ['0',Array(self.digits+1).join('0')];
        }

        var tmp = (value+"").split(".");
        if (tmp.length == 2) {
            //console.log(tmp,tmp[1].length,self.digits);
            if (tmp[1].length >= self.digits) {
                tmp[1] = tmp[1].substr(0,self.digits);
            }
            else {
                tmp[1] = ""+tmp[1] + Array((self.digits-tmp[1].length)+1).join('0');
            }
            //console.log(tmp);
        } else {
            tmp = [value,Array((self.digits)+1).join('0')]
        }

        return tmp;
    },
    _renderEdit : function(jQe) {
        var self = this;
        var n = self._splitNumber();

        jQe.find(self.control_selector).attr('name',self.key).attr('value',self.value);
        jQe.find(self.int_selector).attr('value',n[0]);
        jQe.find(self.dec_selector).attr('value',n[1]);

        self._showSymbol(jQe);
    },
    _finalizeEdit : function(){
        var self = this;
        $(self.container).find(self.int_selector + "," + self.dec_selector).change(function () {
            var i = $(self.container).find(self.int_selector).val();
            var d = $(self.container).find(self.dec_selector).val();
            $(self.container).find(self.control_selector).attr('value',i+'.'+d);
            jQuery(self.container).find(self.control_selector).trigger('change');
        });
    },

    _showSymbol : function(jQe) {
        var self = this;
        if (self.symbol) {
            jQe.find('[data-render_symbol]').html(self.symbol);
            if (self.symbol_position === 'left' ) {
                jQe.find('.symbol_left').removeClass('hide');
            } else {
                jQe.find('.symbol_right').removeClass('hide');
            }
        }
    },
    _renderView : function (jQe) {
        var self = this;
        var n = self._splitNumber();
        var num = n[0];
        if (n[1].length > 0) {
            num = num + self.separator+n[1];
        }
        jQe.find(self.int_selector).html(num);
        self._showSymbol(jQe);

    },

    _finalizeView : function(){},

    getValue : function () {
        return $(self.container).find(self.control_selector).val();
    },
    setValue : function (doubleVal) {
        var self = this;
        var tmp = new String(doubleVal).split('.');
        var intvalue = tmp[0];
        var decimalvalue = 0;
        if(tmp.length = 2) {
            decimalvalue = tmp[1];
        }
        $(self.container).find(self.int_selector).val(intvalue);
        $(self.container).find(self.dec_selector).val(decimalvalue);
    }
});

/**
 * VERSIONE LIBRERIA 3
 */
var RenderTexthtml = Render.extend({
    type : 'texthtml',
    classData : 'texthtml',
    classTemplate : 'texthtml',
    safeKey : null,
    tinymceConfig : null,

    init : function (key,attrs) {
        this._super(key,attrs);
        this.safeKey = key.replace(/[\])}\[{(]/g, '');
    },
    _renderView : function (jQe) {
        var self = this;
        var el = jQe.find(self.element_selector);
        el.html(self.value);
    },
    _renderEdit : function(jQe) {
        var self = this;
        var el = jQe.find(self.control_selector);
        el.attr("name", self.key);
        el.html(self.value);
    },

    _finalizeEdit: function () {
        var self = this;
        var htmlEditorId = "he_" + self.safeKey + "_";
        htmlEditorId += new Date().getTime() + "_" + _.random(0,10000);
        try {
            if ($(self.container).find('[id="' +htmlEditorId + '"]').length > 0) {
                tinyMCE.execCommand('mceRemoveControl', true,'#'+htmlEditorId);// "#"+ htmlEditorId);
            }
            $(self.container).find('[name="' + self.key + '"]').attr('id',htmlEditorId);
            if ($('#'+htmlEditorId).length == 0) {
                throw '#'+htmlEditorId + " html editor not found!";
            }
            var conf = self.tinymceConfig?self.tinymceConfig:_.clone(Render.tinymceConfig);
            conf.selector = '#'+htmlEditorId;
            tinymce.init(conf);
        } catch (e) {
            log.error(e);
        }
    },

    getValue : function () {
        var self = this;
        tinyMCE.triggerSave();
        return $(self.container).find(self.control_selector).val();
    }
});
/**
 * VERSIONE LIBRERIA 3
 */
var RenderDate = Render.extend({
    year_selector    : '[data-render_year]',
    month_selector    : '[data-render_month]',
    day_selector    : '[data-render_day]',
    picker_selector : '[data-render_picker]',
    type : 'date',
    classData : 'date',
    classTemplate : 'date',
    format : 'numeric',
    operator : null,
    active : ['day','month','year'],
    startYear : null,
    endYear : null,
    dateType : 'select',

    _getTemplate : function () {
        var self = this;
        var tplId = self.templateId;
        if (!tplId) {
            if (self.mode == BaseElement.VIEW) {
                tplId = '#' + self.prefixTemplateClass + "_" + self.classTemplate + "_" + self.mode + "_tpl";
                if ($(tplId).length == 0)
                    throw "Template source " + tplId + " Not found";
            }
            else {
                tplId = '#'+self.prefixTemplateClass+"_"+self.classTemplate+"_"+self.dateType+"_tpl";
                if ($(tplId).length == 0)
                    throw "Template source " + tplId + " Not found";

            }
        }
        return $.createDynamicContainer(tplId);
    },


    _renderView : function (jQe) {
        var self = this;
        var value = self.value;
        if (value && value.length > 10) {
            value = value.replace(" ","T");
        }

        var timestamp=Date.parse(value);

        if (isNaN(timestamp)==false)
        {
            var d=new Date(timestamp);
            value = d.toLocaleDateString($.locale,$.cupparisDateFormat(self.format));

        } else {
            value = self.invalidDateString?self.invalidDateString:'';

        }


        var el = jQe.find(self.element_selector);
        el.html(value);

    },
    _renderEdit : function(jQe) {
        var self = this;
        var el = jQe.find(self.control_selector);
        el.attr("name", self.key).attr('value',self.value);
        self._setDateControl(jQe);
    },
    _renderSearch : function(jQe) {
        var self = this;
        var el = jQe.find(self.control_selector);
        el.attr("name", 's_' + self.key + '[]').attr("value", self.value);
        $('<input>').attr({
            type: 'hidden',
            name: 's_' + self.key + "_operator",
            'data-control_operator' : self.key,
            value : self.operator
        }).appendTo(jQe);
        self._setDateControl(jQe);
    },

    _setDateControl : function (jQe) {
        var self = this;
        var active = self.active?self.active:['day','month','year'];
        var currentYear = parseInt(new Date().getFullYear());
        var startYear = self.startYear ? self.startYear : currentYear - 30;
        var endYear = self.endYear ? self.endYear : currentYear + 10;
        if (self.dateType == "select") {
            //DAY
            var elD = jQe.find(self.day_selector);

            //NO VALUE
            var opt = $('<option>').attr({
                value : ''
            });
            opt.html($.translate('general-giorno'));
            elD.append(opt);

            for (var i=1;i<=31;i++) {
                i = Utility.padDate(i, 2)
                var opt = $('<option>').attr({
                    value : i
                });
                opt.html(i);
                elD.append(opt);
            }
            if ($.inArray('day',active) < 0) {
                jQe.find('[data-render_day_container]').addClass('hide');
                elD.addClass('hide');
            }

            //MONTH
            var elM = jQe.find(self.month_selector);
            //NO VALUE
            var opt = $('<option>').attr({
                value : ''
            });
            opt.html($.translate('general-mese'));
            elM.append(opt);

            for (var i=1;i<=12;i++) {
                i = Utility.padDate(i, 2)
                var opt = $('<option>').attr({
                    value : i
                });
                opt.html(i);
                elM.append(opt);
            }
            if ($.inArray('month',active) < 0) {
                jQe.find('[data-render_month_container]').addClass('hide');
                elD.addClass('hide');
            }

            //YEAR
            var elY = jQe.find(self.year_selector);
            //NO VALUE
            var opt = $('<option>').attr({
                value : ''
            });
            opt.html($.translate('general-anno'));
            elY.append(opt);

            for (var i=endYear;i>startYear;i--) {
                var opt = $('<option>').attr({
                    value : i
                });
                opt.html(i);
                elY.append(opt);
            }
            if ($.inArray('year',active) < 0) {
                jQe.find('[data-render_year_container]').addClass('hide');
                elD.addClass('hide');
            }
        } else if (self.dateType == "picker") {
            //var el = obj.find('[data-control_picker]');
            var el = jQe.find(self.picker_selector);
            el.attr("name", self.key + "_picker").attr("value", self.value);

        } else {
            throw "date error subtype " + self.dateType + " undefined";
        }
    },
    _dbDateToArray : function () {
        var self = this;
        if (!self.value)
            return ['','',''];
        var tmpData = self.value;
        if (tmpData.indexOf(' ') >= 0) {
            tmpData = tmpData.split(' ')[0];
        }
        if (tmpData.indexOf('T') >= 0) {
            tmpData = tmpData.split('T')[0];
        }

        var sdate = tmpData.split("-");
        if (sdate[1] && sdate[1].length == 1) {
            sdate[1] = "0"+sdate[1];
        }
        if (sdate[2] && sdate[2].length == 1) {
            sdate[2] = "0"+sdate[2];
        }
        return sdate;
    },
    _changeDate : function () {
        //var options = '<option value="">--</option>';
        var self = this;
        var active = self.active?self.active:['day','month','year'];
        var options = '';
        var year =  $(self.container).find(self.year_selector);
        var month = $(self.container).find(self.month_selector);
        var day =  $(self.container).find(self.day_selector);

        var selected = "";
        var key = self.key;
        var maxDay = 28;
        if (month.val() == '04' || month.val() == '06' || month.val() == '09' || month.val() == '11') {
            maxDay = 30;
        } else if (month.val() != '02') {
            maxDay = 31
        } else if (year.val() % 4 == 0 || year.val() % 100 == 0)
            maxDay = 29;


        for (var i = 1; i <= maxDay; i++) {
            var j = Utility.padDate(i,2);
            if (day.val() == j)
                selected = ' selected="selected" ';
            options += '<option value="' + j + '"' + selected + '>' + j + '</option>';
            selected = '';
        }

        var ex_day = day.val();
        day.empty();
        day.append(options);
        if (ex_day <= maxDay)
            day.val(ex_day);

        var finalDate = $(self.container).find(self.control_selector);//$('input[name="'+key+'"]');
        var d = finalDate.val().split(" ");
        var t = ""; // tempo in caso di campo datetime
        if (d.length > 1)
            t = d[1];

        var date = '';

        //FORZARE YEAR, MONTH E DAY VAL SE NON ATTIVI
        var yearVal = $.inArray('year',active) < 0 ? '0000' : year.val();
        var monthVal = $.inArray('month',active) < 0 ? '00' : month.val();
        var dayVal = $.inArray('day',active) < 0 ? '00' : day.val();
        if (yearVal == '' || monthVal == '' || dayVal == '') {
            date = ''//finalDate.val('');
        } else {
            var date =  yearVal + '-' + monthVal + '-' + dayVal;//finalDate.val(yearVal + '-' + monthVal + '-' + dayVal);
        }
        if (t != "")
            date += ' ' + t;
        finalDate.attr('value',date).val(date);
        return;
    },
    _finalizeView : function() {

    },
    _finalizeSearch : function () {
        var self = this;
        //self._finalizeCommon();
        switch(self.dateType) {
            case 'select':
                self._finalizeEditSelect();
                break;
            case 'picker':
                self._finalizeEditPicker();
                break;
            default:
                throw self.dateType +" dateType invalid";
        }
    },
    _finalizeEdit : function () {
        var self = this;
        //self._finalizeCommon();
        switch(self.dateType) {
            case 'select':
                self._finalizeEditSelect();
                break;
            case 'picker':
                self._finalizeEditPicker();
                break;
            default:
                throw self.dateType +" dateType invalid";
        }
    },
    _finalizeEditPicker : function () {
        var self = this;
        var currentDate = new Date();
        if (self.value)
            currentDate = Utility.jsDate(self.value);
        console.log(currentDate);
        $(self.container).find(self.picker_selector).datepicker({
            autoclose : true,
            format: "dd-mm-yyyy",
        }).on('changeDate', function (ev) {
            var dbDate = Utility.dbDate(ev.date);
            dbDate = dbDate.split(' ')[0];
            $(self.container).find(self.control_selector).val(dbDate);
            //$(this).datepicker('hide');
        });
        $(self.container).find(self.picker_selector).datepicker('setDate',currentDate);

    },
    _finalizeEditSelect : function() {
        var self = this;
        $(self.container).find(self.year_selector+","+self.month_selector+","+self.day_selector).change(function () {
            self._changeDate();
            var sdate = $(self.year_selector).val() + "-" + $(self.month_selector).val() + "-" + $(self.day_selector).val();
        });
        var d = self._dbDateToArray(self.value);
        $(self.container).find(self.year_selector).val(d[0]);
        $(self.container).find(self.month_selector).val(d[1]);
        $(self.container).find(self.day_selector).val(d[2]);
    },
    setValue : function (value) {
        var self = this;
        var container =  self.getContainer();
        var dp = container.find('input[name="' + self.key + '_picker"]');
        dp.datepicker('setDate', value);
    },
    getValue : function () {
        var self = this;
        return $(self.container).find(self.control_selector).val();
    }
});
/**
 * VERSIONE LIBRERIA 3.0
 */
var RenderBetweenDate = Render.extend({
    picker_selector : '[data-render_picker]',
    picker_end_selector : '[data-render_picker_end]',
    control_selector : '[data-render_control]',
    control_end_selector : '[data-render_control_end]',
    control_operator : '[data-render_operator]',

    type : 'between_date',
    classData : 'between_date',
    classTemplate : 'between_date',
    end_key : null,
    end_value : null,

    init : function (key,config) {
        this._super(key,config);
        if (!this.end_key)
            this.end_key = "end_" + this.key;
    },
    _validateEdit : function () {
        var self = this;
        if (!self.end_key)
            throw "end_key not definited!";
    },
    _renderEdit : function (jQe) {
        var self = this;

        var el = jQe.find(self.control_selector);
        el.attr("name", self.key).attr('value',self.value);
        var el = jQe.find(self.control_end_selector);
        el.attr("name", self.end_key).attr('value',self.end_value);
        self._setDateControl(jQe);
    },

    _renderSearch : function (jQe) {

    },
    _setDateControl : function (jQe) {
        var self = this;
        //var el = obj.find('[data-control_picker]');
        var el = jQe.find(self.picker_selector);
        el.attr("name", self.key + "_picker").attr("value", self.value);
        var el = jQe.find(self.picker_end_selector);
        el.attr("name", self.end_key + "_picker").attr("value", self.end_value);

    },


    _finalizeEdit : function () {
        var self = this;
        var key = self.key;
        var key_op = "";
        var currentDate = new Date();
        var endDate = new Date();
        if (self.value)
            currentDate = Utility.jsDate(self.value);
        endDate.setDate(currentDate.getDate()+1);

        if (self.end_value)
            endDate = Utility.jsDate(self.end_value);

        $(self.container).find(self.picker_selector).datepicker({
            autoclose : true,
            format: "dd-mm-yyyy",
        }).on('changeDate', function (ev) {
            var dbDate = Utility.dbDate(ev.date);
            dbDate = dbDate.split(' ')[0];
            log.debug("onChandeDate Start",dbDate);
            $(self.container).find(self.control_selector).val(dbDate);
            $(self.container).find(self.picker_end_selector).datepicker('setStartDate',ev.date);
        });
        $(self.container).find(self.picker_selector).datepicker('setDate',currentDate);

        $(self.container).find(self.picker_end_selector).datepicker({
            autoclose : true,
            startDate : currentDate,
            format: "dd-mm-yyyy"
        }).on('changeDate', function (ev) {
            var dbDate = Utility.dbDate(ev.date);
            dbDate = dbDate.split(' ')[0];
            log.debug("onChandeDate End",dbDate);
            $(self.container).find(self.control_end_selector).val(dbDate);
        });
        //console.log("end date",endDate);
        $(self.container).find(self.picker_end_selector).datepicker('setDate',endDate);
    },
    setValue : function (start,end) {
        var self = this;
        var container =  $(self.container);
        var dp = container.find('input[name="' + self.key + '_picker"]');
        dp.datepicker('setDate', start);
        var dp = container.find('input[name="' + self.end_key + '_picker"]');
        dp.datepicker('setDate', end);
    },
    getValue : function() {
        var self = this;
        var start =  $(self.container).find(self.control_selector).val();
        var end =  $(self.container).find(self.control_end_selector).val();
        return [start,end];
    }

});

/**
 * VERSIONE LIBRERIA 3
 *
 * UPLOAD SEMPLICE DA RIVEDERE
 */
var RenderUpload = Render.extend({
    type : 'upload',
    classData : 'upload',
    classTemplate : 'upload',
    itemViewTemplate : null,  // template del singolo item di view
    itemEditTemplate : null,  // template del singolo item di edit
    langs : ['it'],
    limit : null,
    modelName : null,
    icons : {".jpg" : "fa fa-picture-o"},
    icon_selector : "[data-icon_img]",
    uploaded_json : {},
    path_key : null,
    uploadType : 'foto',
    buttonLabel : 'upload',
    imagecacheTemplate : 'icon',

    init: function (key,config) {
        this._super(key,config);
        this.itemViewTemplate = '#' + this.prefixTemplateClass + '_' + this.uploadType + '_view_item_tpl';
        this.itemEditTemplate = '#' + this.prefixTemplateClass + '_' + this.uploadType + '_edit_item_tpl';
    },

    _renderEdit : function (jQe) {
        var self = this;
        self._renderTemplateData(jQe);
        jQe.find(self.control_selector).val(self.value).attr('name',self.key);
    },
    _finalizeEdit : function() {
        var self = this;
        $(self.container).find('[data-button_upload]').html(self.buttonLabel);
        $(self.container).find('[data-button_upload]').click(function () {
            self.upload();
        });
    },
    _renderView : function(jQe) {
        var self = this;
        //log.info("Render uppload view ", self.data);
        if (self.value) {

            if (self.uploadType == 'foto') {
                jQe.find('[data-render_element]').html('<img src="/viewimage/' + self.value + '/imagecache/' + self.imagecacheTemplate + '" />');
            } else {
                jQe.find('[data-render_element]').html('<a target="_blank" href="/download/' + self.value + '/' + self.path_key + '" >'+self.value+'</a>');
            }
        }
    },
    _finalizeView : function() {

    },
    upload : function () {
        var self = this;
        var body = $.createDynamicContainer('#' + self.prefixTemplateClass + '_' + 'upload_dialog_content_tpl');
        var modelName = self.modelName;
        var params = {
            path_key : self.path_key,
            type : self.uploadType,
            icon : "",
            filename : 'default.png',
        }
        log.info("action upload " + self.key + " type " + self.uploadType,params);
        $(body).find('[data-preview]').attr('data-template',self.idItemPreviewTemplate);
        $.renderTemplate('#'+body.attr('id'), '#'+body.attr('id'), params);

        var dialogId = self._getDialogId();

        $(dialogId + ' .modal-body').html(body.html());
        $(dialogId + ' .modal-title').html($.translate('general-add'));
        $(dialogId + ' [data-file-label]').html($.translate('general-accepted-extensions'));
        $(dialogId + ' [data-estensioni-label]').html(' ');

        body.remove();
        $(dialogId + ' .btok').addClass("disabled");

        $(dialogId + ' form').ajaxForm({
            beforeSubmit: function (a, f, o) {
                o.dataType = 'json';
                $.waitStart();
            },
            error: function (data, error, msg) {
                //alert("JSON error" + data + ' ' + error + ' ' + msg);
                $.waitEnd();
                //$.errorDialog("Upload error " + data + " " + error + " " + msg);
                self._showError("Upload error " + data + " " + error + " " + msg)
                $(dialogId + ' .btok').addClass("disabled");
            },
            success: function (data) {
                $.waitEnd();
                if (data.error) {
                    self._showError(data.msg);
                    $(dialogId + ' .btok').addClass("disabled");
                    return;
                }
                if (self.uploadType == 'foto') {
                    var image_src = Facade.getUrl('/imagecache/small/' + data.result.filename);
                    //$(dialogId + ' .preview').attr('src',image_src ).removeClass('hide');
                    $(dialogId + " [data-icon]").attr('src',image_src );
                }
                else {
                    //var icon_src = Facade.getUrl("/imagecache/icon/" + self.icons[data.result.ext]);
                    //$(dialogId + ' .preview').attr("src", icon_src).removeClass('hide');
                    $(dialogId + " [data-icon]").addClass(self.icons[data.result.ext]);
                }
                self.uploaded_json = data.result;
                console.log('uploaded recevied',data);
                $(dialogId + ' .btok').removeClass("disabled");
                self.afterUpload(data);
            }
        });
        // auto upload
        $(dialogId + ' input[name="file"]').autoUpload(function () {
            $(dialogId + ' form').submit();
        })

        $(dialogId).modal('show').ok(function () {
            self.ok();
        }).cancel(function () {
            self.cancel();
        })
    },
    ok : function () {
        var self  = this;
        self.value = self.uploaded_json.filename;
        self._renderTemplateData(self.container);

        //console.log($(self.container).find(self.control_selector),self.uploaded_json.filename);
        //$(self.container).find('[data-filename]').html(self.uploaded_json.filename);
        $(self.container).find(self.control_selector).attr('value',self.uploaded_json.filename);
        self._finalizeEdit();
    },
    cancel : function () {

    },
    /**
     * aggancia gli eventi sui pulsanti degli upload
     */
    _bindDeleteEvents : function () {
        var self = this;
        $(self.container).find('[data-button_delete]').unbind('click');
        $(self.container).find('[data-button_delete]').click(function () {
            var index = $(this).closest("[data-" + self.uploadType + "_item]").index();
            self.deleteItem(index);
        });
    },
    // addItem : function () {
    //     var self = this;
    //     log.info("action upload " + self.key + " type " + self.uploadType);
    //     var body = $.createDynamicContainer('#' + self.prefixTemplateClass + '_' + self.uploadType + '_dialog_upload_tpl');
    //     var modelName = self.modelName;
    //
    //     var params = {
    //         path_key: self.path_key,
    //         type : self.uploadType,
    //         langs : self.langs,
    //         type : self.key,
    //
    //     }
    //     log.info("action upload " + self.key + " type " + self.uploadType,params);
    //     $.renderTemplate('#'+body.attr('id'), '#'+body.attr('id'), params);
    //
    //     var dialogId = self._getDialogId();
    //     $(dialogId + ' .modal-body').html(body.html());
    //     body.remove();
    //     $(dialogId + ' .btok').addClass("disabled");
    //     $(dialogId + ' form').ajaxForm({
    //         beforeSubmit: function (a, f, o) {
    //             o.dataType = 'json';
    //             $.waitStart();
    //         },
    //         error: function (data, error, msg) {
    //             //alert("JSON error" + data + ' ' + error + ' ' + msg);
    //             $.waitEnd();
    //             //$.errorDialog("Upload error " + data + " " + error + " " + msg);
    //             self._showError("Upload error " + data + " " + error + " " + msg)
    //             $(dialogId + ' .btok').addClass("disabled");
    //         },
    //         success: function (data) {
    //             $.waitEnd();
    //             if (data.error) {
    //                 //$.errorDialog("Error: " + data.msg.toString());
    //                 self._showError(data.msg);
    //                 $(dialogId + ' .btok').addClass("disabled");
    //                 return;
    //             }
    //             if (self.uploadType == 'foto')
    //                 $(dialogId + ' .preview').attr('src','/imagecache/small/'+data.result.filename).removeClass('hide');
    //             else {
    //                 $(dialogId + ' .preview').attr("src", "/imagecache/icon/" +
    //                     ModelsConfs.icons[data.result.ext]).removeClass('hide');
    //             }
    //
    //             // aggiorno i campi di contorno di uploadfoto
    //             for (var k in data.result) {
    //                 $(dialogId + ' form').find('input[name="' + k + '"]').attr('value', data.result[k]);
    //             }
    //             // aggiorno il nome con il nome file se non valorizzato
    //             for (var i in self.langs) {
    //                 var lang = self.langs[i];
    //                 if (!$(dialogId + ' form').find('input[name="nome_' + lang + '"]').attr('value')) {
    //                     $(dialogId + ' form').find('input[name="nome_'+ lang+'"]').attr('value', data.result['original_name']);
    //                 }
    //             }
    //             /*
    //              if ($('#upload_foto_dialog form').find('input[name="nome"]').attr('value') == '') {
    //              $('#upload_foto_dialog form').find('input[name="nome"]').attr('value', data.result['original_name']);
    //              }
    //              */
    //             $(dialogId + ' .btok').removeClass("disabled");
    //             self.afterUpload(data);
    //         }
    //     });
    //     // auto upload
    //     $(dialogId + ' input[name="file"]').autoUpload(function () {
    //         $(dialogId + ' form').submit();
    //     })
    //
    //     $(dialogId).modal('show').ok(function () {
    //         var formData = $(dialogId + ' form').serializeAssoc();
    //         // self.viewObj.addFotoItem(formData,key);
    //         formData.updated_at  = new Date();
    //         self.renderNewItem(formData);
    //     }).cancel(function () {
    //         //alert('cancel');
    //     })
    // },

    // _getTemplate : function () {
    //     var self = this;
    //     var tplId = self.templateId;
    //     if (!tplId) {
    //         tplId = '#'+self.prefixTemplateClass+"_"+self.uploadType+"_"+self.mode+"_tpl";
    //         if ($(tplId).length == 0)
    //             tplId = '#'+self.prefixTemplateClass+"_"+self.type+"_tpl";
    //         if ($(tplId).length == 0)
    //             throw "Template source " + '#'+self.prefixTemplateClass+"_"+self.uploadType+"_"+self.mode+"_tpl Not found";
    //     }
    //
    //     return $.createDynamicContainer(tplId);
    // },

    _getDialogId : function () {
        var self = this;
        return '#default_upload_dialog';
    },
    _showError : function (msg) {
        var self = this;
        $(self._getDialogId() + ' .alert').removeClass('hide').html(msg)
    },
    /**
     * metodo chiamato dopo che il file e' stato uploadato
     * @param data: dati in json ritornati dal backend
     */
    afterUpload : function (data) {
    },

    _renderTemplateData : function (container) {
        var self = this;

        if (self.value) {
            if (self.uploadType == 'foto') {
                var tplData = {
                    link: '/viewimage/' + self.value + '/imagecache/' + self.imagecacheTemplate,
                    filename: '',
                    icon: '',
                    uploadType: self.uploadType,
                }
            } else {
                var tplData = {
                    link: self.value ? Facade.getUrl('/download/' + self.value) : '#',
                    filename: self.value,
                    icon: Utility.getMimetypeIcon(self.value),
                    uploadType: self.uploadType,
                }
            }
            $.renderTemplate(container, container, tplData);
        }


    }
});

/**
 * VERSIONE LIBRERIA 3
 */
/**
 * autocomplete
 * extra config param
 * config.model : nome modello
 * config.description : vettore campi da visualizzare nella description
 * config.description_separator : separatore dei campi description default -
 *
 **/
var RenderAutocomplete = Render.extend({
    url : null,
    type : 'autocomplete',
    classData : 'autocomplete',
    classTemplate : 'autocomplete',
    autocomplete_view_selector : '[data-render_autocomplete_view]',
    autocomplete_input_selector : '[data-render_autocomplete_input]',
    model_description : [],
    separator : null,
    fields : [],
    autocompleteModel : null,
    n_items : null,
    metodo : null,
    modelData : null,

    _getLabelValue : function (modelData) {
        var self = this;
        var label = $.translate('general-ricerca');
        if (!modelData)
            return label;
        if (!self.model_description) {
            if (modelData.label)
                return modelData.label;
            return label;
        }
        //console.log("get label valueeeeeee",modelData,self.model_description)
        label = '';
        var separator = self.separator?self.separator:' ';
        for (var f in self.model_description) {
            if (!modelData[ self.model_description[f] ])
                continue;
            label += modelData[ self.model_description[f] ];
            if (f < self.model_description.length -1 )
                label += separator;
        }
        return label;
    },
    /**
     * ritorna il nome dell'inputview, tiene conto del fatto che si potrebbe trovare in un hasmany
     * e il nome potrebbe avere le []
     */

    _getInputViewName : function () {
        var self = this;
        var v_name = self.key;
        if (v_name.indexOf('[]') >= 0) {
            v_name = v_name.substr(0,v_name.length-2);
            return v_name+"_view[]";
        }
        return v_name+ "_view";
    },

    _getFieldValue : function(modelData) {
        var self = this;
        if (!modelData || modelData.length === 0 || !self.fields || self.fields.length === 0)
            return '';
        return modelData[ self.fields[0] ];
    },
    _renderEdit : function (jQe) {
        var self = this;
        // nel caso di custom devo normalizzare i risultati
        // TODO va fatto nel costruttore in modo che valga per tutti
        var el = jQe.find(self.control_selector);
        el.attr("name", self.key).attr("value", self.value);
        var el = jQe.find(self.autocomplete_input_selector);
        var v_name = self._getInputViewName();
        el.attr("name", v_name).val(self._getFieldValue(self.modelData)).attr('value',self._getFieldValue(self.modelData));

        //el.attr("name", self.key + "_view").val(self._getFieldValue(self.modelData)).attr('value',self._getFieldValue(self.modelData));

        var el = jQe.find(self.autocomplete_view_selector);
        el.attr("data-render_autocomplete_view", v_name).html(self._getLabelValue(self.modelData));

        //el.attr("id", "div_" + self.key + "_view").html(self._getLabelValue(self.modelData));
        return ;
    },

    _renderSearch : function (jQe) {
        var self = this;
        self._renderEdit(jQe);
        var el = jQe.find(self.control_selector);
        el.attr("name", 's_' + self.key + '[]');
        $('<input>').attr({
            type: 'hidden',
            name: 's_' + self.key + "_operator",
            'data-control_operator' : self.key,
            value : self.operator
        }).appendTo(jQe);
    },
    _finalizeSearch : function () {
        this._finalizeEdit();
    },
    _createUrl : function () {
        var self = this;
        var url = self.url?self.url:"/api/json/autocomplete/" + self.autocompleteModel + "?";

        if (self.fields) {
            for(var f in self.fields) {
                url+="field[]="+self.fields[f]+"&";
            }
        }
        /* @TODO se metto la description diventa difficile cambiare la
         if (self.model_description) {
         for(var f in self.model_description) {
         url+="description[]="+self.model_description[f]+"&";
         }
         }
         */
        url += self.separator ? '&separator=' + self.separator : '';
        url += self.n_items ? '&n_items=' + self.n_items : '';
        url += self.metodo ? '&method=' + self.metodo : '';
        return url;
    },
    _finalizeEdit : function () {


        var self = this;
        var field = $(self.container).find(self.autocomplete_input_selector);
        var url = self._createUrl();

        var dataResult = new Bloodhound({
            datumTokenizer: function (datum) {

                return Bloodhound.tokenizers.whitespace(datum.label);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {

                //url: 'http://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=470fd2ec8853e25d2f8d86f685d2270e',
                url: url + "&term=%QUERY",
                filter: function (json) {
                    //log.info("autocomplete data",json);
                    // Map the remote source JSON array to a JavaScript array
                    return $.map(json.result, function (element) {
                        return self.getAutocompleteRow(element);
                    });
                }


            }
        });

        dataResult.initialize();
        // Instantiate the Typeahead UI
        field.typeahead(null, {
            displayKey: 'label',
            source: dataResult.ttAdapter()
        });
        self._renderSelectedValue();
        $(self.container).find('[data-button_clear]').click(function () {
            field.typeahead('val','');
            $(self.container).find(self.control_selector).val('');
        })
    },
    _renderSelectedValue : function () {
        var self = this;
        var field = $(self.container).find('[data-render_element]');
        field.on('typeahead:selected', function (e, datum) {
            var fname = self.key;
            if (self.mode=='search')
                fname = 's_' + self.key +  '[]';
            var fieldNext = $(self.container).find('input[name="' + fname + '"]');
            var v_name = self._getInputViewName();
            var viewDiv = $(self.container).find('[data-render_autocomplete_view="' + v_name + '"]');
            datum.id ? fieldNext.val(datum.id) : fieldNext.val('');

            viewDiv.text(self._getLabelValue(datum.data));
            self.ev_selected(datum);
        });

    },
    getAutocompleteRow : function (element) {
        return element;


        return {
            label: element.label,
            value: element.id
        };
    },
    ev_selected : function (datum) {

    },
    getValue : function () {
        throw "not yet implemented";
    }
});
/**
 * VERSIONE LIBRERIA 3
 *
 * Controllo per la gestione degli hasmany con upload
 * gestisce sia gli attachments che le foto.
 * 
 */
var RenderHasmanyUpload = Render.extend({
    type : 'hasmany_upload',
    classData : 'hasmany_upload',
    classTemplate : 'hasmany_upload',
    itemViewTemplate : null,  // template del singolo item di view
    itemEditTemplate : null,  // template del singolo item di edit
    idItemPreviewTemplate : null, // id del template da utilizzare per la preview
    langs : ['it'],
    uploadType : null,
    limit : null,
    modelName : null,
    uploadModelName : null,
    icons : {
        "default"   : 'fa fa-3x fa-file-o',
        "xls"       : 'fa fa-3x fa-file-excel-o',
        "zip"       : 'fa fa-3x fa-file-archive-o',
        "mp3"       : 'fa fa-3x fa-audio-o',
        "jpg"       : "fa fa-3x fa-image-o",
        "pdf"       : "fa fa-3x fa-file-pdf-o"
    },
    //common_fields
    common_fields : {
        foto : ['ext','random','id','status','original_name','filename','mimetype'],
        attachment : ['ext','random','id','status','original_name','filename','mimetype'],
    },
    extra_fields : {
        foto : [],
        attachment : [],
    },
    lang_fields : {
        foto : ['nome','descrizione'],
        attachment : ['nome','descrizione']
    },

    label_field : 'nome_it',
    icon_selector : "[data-icon_img]",

    init: function (key,config) {

        this._super(key,config);

        if (!this.itemViewTemplate)
            this.itemViewTemplate = '#' + this.prefixTemplateClass + '_' + this.uploadType + '_view_item_tpl';
        if (!this.itemEditTemplate)
            this.itemEditTemplate = '#' + this.prefixTemplateClass + '_' + this.classTemplate + '_edit_item_tpl';
        if (!this.idItemPreviewTemplate)
            this.idItemPreviewTemplate = '#' + this.prefixTemplateClass + "_" + this.uploadType + "_item_preview_tpl";

        if (!this.uploadModelName) {
            this.uploadModelName = this.uploadType;
        }
    },

    _renderEdit : function (jQe) {
        var self = this;
        var html = '';
        jQe.find('[data-upload_title]').html($.translate('model-'+self.uploadModelName,2));
        jQe.find('[data-button_add]').html($.translate('general-add') + " " + $.translate('model-'+self.uploadModelName,1))
        jQe.find("[data-render_list]").attr('data-render_list',self.key)
        for (var i in self.value) {
            html += self._createItem(self.value[i], 'updated');
        }


        jQe.find("[data-render_limit]").addClass("hide");
        jQe.find('[data-render_list="' + self.key + '"]').html(html);
        jQe.find("[data-pk]").attr('data-pk',self.key);
        var exists = self.key + "_exists";
        $('<input>').attr({
            type: 'hidden',
            name: exists,
            value : 1
        }).appendTo(jQe);
    },
    _finalizeEdit : function() {
        var self = this;
        self._bindActions();
        self._checkLimit();
        if ( $(self.container).length == 0 ) {
            log.warn("Upload " + self.uploadType + " container not found " , self.container);
            return ;
        }
        $(self.container).find('[data-button_add]').click(function () {
            self.addEditItem();
        });
        $(self.container).find(".sort_class").sortable({
            handle: '.button-move',
        });
    },
    _renderView : function(jQe) {
        var self = this;
        if (self.value.length > 0) {
            var items = self.value;
            if (self.limit) {
                items = [];
                for (var j=0;j<self.limit;j++) {
                    if (j < self.value.length)
                        items.push(self.value[j]);
                }
            }
            $.renderTemplate(self.itemViewTemplate,jQe.find('[data-render_list]'),items);
        } else {
            jQe.find('[data-button_upload]').addClass('disabled');
        }
    },
    _finalizeView : function() {

    },
    /**
     * crea l'item html da aggiungere alla form del modello
     **/
    _createItem : function (values,status) {
        var self = this;
        values.status=status;
        values['random_id'] = values.id?values.id:new Date().getTime();
        values['langs'] = self.langs;
        values['label'] = values[self.label_field]?values[self.label_field]:"";
        values['icon'] = self.icons[values.ext]?self.icons[values.ext]:self.icons["default"];
        var tmpContainer = $.createDynamicContainer(self.itemEditTemplate);
        // setto il template della preview per il tipo di upload
        tmpContainer.find('[data-preview]').attr('data-template',self.idItemPreviewTemplate);

        log.debug("RenderHasmanyUpload._createItem",self.itemEditTemplate,values);
        for (var i in self.common_fields[self.uploadType]) {
            var field = self.common_fields[self.uploadType][i];
            tmpContainer.find('[data-model_fields]').append(
                $('<input>').attr({
                    type: 'hidden',
                    name: self.key + "-" + field + "[]",
                    value : values[field]
                })
            )
        }
        for (var i in self.extra_fields[self.uploadType]) {
            var field = self.extra_fields[self.uploadType][i];
            tmpContainer.find('[data-model_fields]').append(
                $('<input>').attr({
                    type: 'hidden',
                    name: self.key + "-" + field + "[]",
                    value : values[field]
                })
            )
        }
        for (var i in self.lang_fields[self.uploadType]) {
            var field = self.lang_fields[self.uploadType][i];
            for (var k in self.langs) {
                var lang = self.langs[k];
                tmpContainer.find('[data-model_fields]').append(
                    $('<input>').attr({
                        type: 'hidden',
                        name: self.key + "-" + field + "_" + lang +  "[]",
                        value : values[field+"_"+lang]
                    })
                )
            }

        }

        $.renderTemplate('#'+tmpContainer.attr('id'), '#'+tmpContainer.attr('id'), values);

        tmpContainer.find(self.icon_selector).addClass(self.icons[values.ext]).addClass('fa-3x');
        // TODO com'e' il link per il download, sia in temp (new) che in edit
        tmpContainer.find('[data-pk]').attr("data-pk", values.id);
        var html = tmpContainer.html();//obj.html();
        tmpContainer.remove();
        return html;
    },

    /**
     * aggancia gli eventi sui pulsanti degli upload
     */
    _bindActions : function () {
        var self = this;
        $(self.container).find('[data-button_delete]').unbind('click');
        $(self.container).find('[data-button_delete]').click(function () {
            var index = $(this).closest("[data-upload_item]").index();
            self.deleteItem(index);
        });
        $(self.container).find('[data-button_edit]').unbind('click');
        $(self.container).find('[data-button_edit]').click(function () {
            alert('da implementae');
            return ;
            var index = $(this).closest("[data-upload_item]").index();
            self.addEditItem(index);
        });
    },
    /**
     * controlla se e' stato raggiunto il limite degli upload inseribili. In quel caso
     * nasconde il bottone aggiungi
     */
    _checkLimit : function () {
        var self = this;

        if (!self.limit) {
            $(self.container).find("[data-render_limit]").addClass("hide");
            $(self.container).find('[data-button_add]').removeClass("hide");
            return ;
        }
        // conto gli elementi tenendo conto di eventuali delete
        var numItems = 0;
        $.each($(self.container).find('[data-upload_item]'), function () {
            if (!$(this).hasClass('hide'))
                numItems++;
        })
        log.debug("CHECK LIMIT",numItems,self.limit);
        if (numItems >= self.limit) {
            $(self.container).find("[data-render_limit]").removeClass("hide");
            $(self.container).find('[data-button_add]').addClass("hide");
        } else {
            $(self.container).find("[data-render_limit]").addClass("hide");
            $(self.container).find('[data-button_add]').removeClass("hide");
        }

    },
    renderNewItem : function (values) {
        var self = this;
        var html = self._createItem(values, 'new');
        log.debug("upload new item",self.container,'[data-render_list="'+ self.key + '"]');
        $(self.container).find('[data-render_list="'+ self.key + '"]').append(html);
        self._bindActions();
        self._checkLimit();
    },

    deleteItem : function (index) {
        var self = this;
        var hasManyContainer = $(self.container).find('[data-render_list]');
        var status = hasManyContainer.find('input[name="' + self.key + '-status[]"]:eq('+index+')').val();
        log.debug(self.uploadType +  ".deleteItem  status " + status);
        //hasManyContainer.find()

        if (status == "new") {
            hasManyContainer.find('[data-upload_item]:eq('+index+')').remove();
            self._checkLimit();
        } else {
            $.confirmDialog("Rimuovo " + self.uploadType + "?").ok(function () {
                hasManyContainer.find('input[name="' + self.key + '-status[]"]:eq('+index+')').attr("value",'deleted');
                hasManyContainer.find('[data-upload_item]:eq('+index+')').addClass("hide");
                self._checkLimit();
            });
        }
    },
    addEditItem : function (index) {
        var self = this;
        if (""+index != 'undefined') {
            var itemContainer = $(self.container).find('[data-render_list]').get(index);
            var tplData = {};
            $.each($(itemContainer).find('input'),function () {
                tplData[$(this).attr('name')] = $(this).val();
            });
            console.log('ADDETDITITEMMMMM',tplData);
        }




        log.info("action upload " + self.key + " type " + self.uploadType);
        var body = $.createDynamicContainer('#' + self.prefixTemplateClass + '_' + 'hasmany_upload_dialog_content_tpl');
        var modelName = self.modelName;

        var params = {
            modelName: Utility.camelCase(modelName),
            random_id : "tdialog" + self.uploadType,
            langs : self.langs,
            type : self.key,
            icon : "",
            filename : 'default.png',
        }
        $(body).find('[data-preview]').attr('data-template',self.idItemPreviewTemplate);
        $.renderTemplate('#'+body.attr('id'), '#'+body.attr('id'), params);

        var dialogId = self._getDialogId();
        console.log('DALOG: ',dialogId);

        $(dialogId + ' .modal-body').html(body.html());
        $(dialogId + ' .modal-title').html($.translate('general-add') + ' ' + $.translate('model-'+self.uploadModelName));
        $(dialogId + ' [data-file-label]').html($.translate('general-accepted-extensions'));
        $(dialogId + ' [data-estensioni-label]').html($.translate('general-extensions-'+self.uploadModelName));

        body.remove();
        $(dialogId + ' .btok').addClass("disabled");

        $(dialogId + ' form').ajaxForm({
            beforeSubmit: function (a, f, o) {
                o.dataType = 'json';
                self._hideError();
                $.waitStart();
            },
            error: function (data, error, msg) {
                //alert("JSON error" + data + ' ' + error + ' ' + msg);
                $.waitEnd();
                //$.errorDialog("Upload error " + data + " " + error + " " + msg);
                self._showError("Upload error " + data + " " + error + " " + msg)
                $(dialogId + ' .btok').addClass("disabled");
            },
            success: function (data) {
                $.waitEnd();
                if (data.error) {
                    //$.errorDialog("Error: " + data.msg.toString());
                    console.log('SELF: ',self.uploadType);
                    self._showError(data.msg);
                    $(dialogId + ' .btok').addClass("disabled");
                    return;
                }
                if (self.uploadType == 'foto') {
                    var image_src = Facade.getUrl('/imagecache/small/' + data.result.filename);
                    //$(dialogId + ' .preview').attr('src',image_src ).removeClass('hide');
                    $(dialogId + " [data-icon]").attr('src',image_src );
                }
                else {
                    //var icon_src = Facade.getUrl("/imagecache/icon/" + self.icons[data.result.ext]);
                    //$(dialogId + ' .preview').attr("src", icon_src).removeClass('hide');
                    $(dialogId + " [data-icon]").addClass(self.icons[data.result.ext]);
                }

                // aggiorno i campi di contorno di uploadfoto
                for (var k in data.result) {
                    $(dialogId + ' form').find('input[name="' + k + '"]').attr('value', data.result[k]);
                }
                // aggiorno il nome con il nome file se non valorizzato
                for (var i in self.langs) {
                    var lang = self.langs[i];
                    if (!$(dialogId + ' form').find('input[name="nome_' + lang + '"]').attr('value')) {
                        $(dialogId + ' form').find('input[name="nome_'+ lang+'"]').attr('value', data.result['original_name']);
                    }
                }
                /*
                 if ($('#upload_foto_dialog form').find('input[name="nome"]').attr('value') == '') {
                 $('#upload_foto_dialog form').find('input[name="nome"]').attr('value', data.result['original_name']);
                 }
                 */
                $(dialogId + ' .btok').removeClass("disabled");
                self.afterUpload(data);
            }
        });
        // auto upload
        $(dialogId + ' input[name="file"]').autoUpload(function () {
            $(dialogId + ' form').submit();
        })

        $(dialogId).modal('show').ok(function () {
            self.ok();
            /*
            var formData = $(dialogId + ' form').serializeAssoc();
            // self.viewObj.addFotoItem(formData,key);
            formData.updated_at  = new Date();
            self.renderNewItem(formData);
            */
        }).cancel(function () {
            //alert('cancel');
            self.cancel();
        })
    },

    _getTemplate : function () {
        var self = this;
        if (self.mode == 'edit')
            return self._super();

        var tplId = self.templateId;
        if (!tplId) {
            tplId = '#'+self.prefixTemplateClass+"_"+self.uploadType+"_"+self.mode+"_tpl";
            if ($(tplId).length == 0)
                tplId = '#'+self.prefixTemplateClass+"_"+self.type+"_tpl";
            if ($(tplId).length == 0)
                throw "Template source " + '#'+self.prefixTemplateClass+"_"+self.uploadType+"_"+self.mode+"_tpl Not found";
        }

        return $.createDynamicContainer(tplId);
    },
    _getDialogId : function () {
        var self = this;
        return '#' + self.prefixTemplateClass + '_' + self.classTemplate + '_dialog';
    },
    _showError : function (msg) {
        var self = this;
        $(self._getDialogId() + ' .alert').removeClass('hide').html(msg)
    },
    _hideError : function () {
        var self = this;
        $(self._getDialogId() + ' .alert').addClass('hide').html('')
    },
    /**
     * azione ok della popup che richiede l'upload dell'oggetto
     */
    ok : function() {
        var self = this;
        var dialogId = self._getDialogId();
        var formData = $(dialogId + ' form').serializeAssoc();
        // self.viewObj.addFotoItem(formData,key);
        formData.updated_at  = new Date();
        self.renderNewItem(formData);
    },
    /**
     * azione cancel della popup
     */
    cancel : function () {

    },

    getValue : function () {
        var self = this;
        var values = [];
        $.each( $(self.container + " ul li"),function() {
            var v = $(this).find('input').serializeArray();
            var itemValues = {};
            for(var k in v) {
                itemValues[v[k].name] = v[k].value;
            }
             values.push(itemValues);
        });
        return values;
    },
    /**
     * metodo chiamato dopo che il file e' stato uploadato
     * @param data: dati in json ritornati dal backend
     */
    afterUpload : function (data) {
    },


});

/**
 * VERSIONE LIBRERIA 3
 */
var RenderHasmany = Render.extend({
    type : 'hasmany',
    classData : 'hasmany',
    classTemplate : 'hasmany',
    hasManyModelName : null,
    hasManyModelRelativeName : null,
    _views : [],
    jsonData : null,
    limit : null,
    template : null,
    separator : null,
    fields : [],
    metadata : {},
    itemEditTemplate : null,
    itemViewTemplate : null,
    editTemplate : null,
    viewTemplate : null,
    init: function (key,config) {
        this._super(key,config);
    },

    _renderView : function(jQe) {
        var self = this;
        //log.info("RenderHasmany view ", self.data);
        if (self.value && self.value.length > 0) {
            var items = [];
            var numItems = self.limit?(self.limit<self.value.length)?self.limit:self.value.length:self.value.length;

            var tpl = '#' + self.prefixTemplateClass + '_' + self.type + '_view_items_tpl';

            if (self.template) {
                tpl = self.template
                for (var i=0;i<numItems;i++) {
                    items.push(self.value[i]);
                }
            } else {
                var separator = self.separator?self.separator:" ";
                for (var i=0;i<numItems;i++) {
                    var label = "";
                    //console.log('datai',self.value[i]);
                    for (var fi in self.fields) {
                        var field = self.fields[fi];
                        label+= self.value[i][field];
                        if (fi < self.fields.length-1)
                            label+= separator;
                    }
                    items.push({label:label});
                }

            }

            var tplData = {
                items : items
            }
            //console.log("ddddddd",tplData,tpl);
            $.renderTemplate($(tpl),jQe.find('[data-render_list]'),tplData);
        } else {
            jQe.find('[data-button_upload]').addClass('disabled');
        }
    },

    _finalizeView : function() {

    },

    _renderEdit : function (jQe) {
        var self = this;
        jQe.find('[data-render_list]').attr('data-render_list',self.key);
        var exists = self.key + "_exists";
        $('<input>').attr({
            type: 'hidden',
            name: exists,
            value : 1
        }).appendTo(jQe);
        return ;
    },



    _finalizeEdit : function () {
        var self = this;

        log.debug("finalize ",self.key," modelName " + self.metadata.modelRelativeName,$(self.container).find('[data-hasmany_container="'+ self.metadata.modelRelativeName+'"]').length);
        // renderizzo i valori gia' presenti

        var html = "";
        var _tmp = function () {

            for (var i in self.value) {
                var item = self.value[i];
                self.renderNewItem($(self.container),item);
            }


            $(self.container).find('[data-hasmany_title]').html($.translate('model-'+Utility.snakeCase(self.metadata.modelRelativeName),2));
            //jQe.find('[data-hasmany_title_msg]').html($.translateRaw(self.parentView.modelName+'-'+self.key+'_msg'));
            //jQe.find('[data-button_add]').html($.translate('general-add') + " " + $.translate('model-'+self.hasManyModelRelativeName));

            //jQe.find('[data-render_list="' + self.key + '"]').html(html);
            $(self.container).find('[data-button_add]').html($.translate('general-add') + " " + $.translate('model-'+Utility.snakeCase(self.metadata.modelRelativeName)) );

            self._bindDeleteEvents();
            $(self.container).find('[data-render_id="'+ self.key+'"]').find('[data-button_add]').click(function () {
                self.renderNewItem($(self.container));
                //console.log('HTML has many',self.container,'[data-render_id="'+ self.key+'"]','[data-hasmany_container="' + self.key + '"]');
                //$(self.container).find('[data-render_id="'+ self.key+'"]').find('[data-render_list="' + self.key + '"]').append(html);
                self._bindDeleteEvents();
            });
            $(self.container).find(".sort_class").sortable({
                handle: '.button-move',
            });
        }
        if (!self.jsonData) {
            self.getJsonData(function (json) {
                self.jsonData = json;
                _tmp();
            })

        } else {
            _tmp();
        }

    },
    _bindDeleteEvents : function () {
        var self = this;
        $(self.container).find('[data-button_delete]').unbind('click');
        $(self.container).find('[data-button_delete]').click(function () {
            var index = $(this).closest("li").index();
            var vIndex = $(this).closest("li").find('[data-view_index]').data('view_index');
            log.debug("found index ",index,'viewindex',vIndex);
            //$.messageDialog("index " + index);
            //var obj = $(self.container).find('[data-hasmany_container="'+self.hasManyModelName + '"]')
            self.deleteHasManyItem(self.hasManyModelRelativeName, index,vIndex);
        });
    },
    renderNewItem : function (jQe,values) {
        var self = this;
        var status = 'updated';
        var fields = [];
        if (!values) {
            status = 'new';
            // prendo i valori di default dei metadata;
            //var fields = self.metadata.fields;
            fields = Object.keys(self.jsonData.result);
            values = {};
            for (var i in self.jsonData.result) {
                values[i] = self.jsonData.result[i]//fields[i].column_default;
            }
        }
        values.status = status;
        var viewModelName = self.key;//self.metadata.modelRelativeName;
        // controllo che non abbia una configurazione privata

        var viewConfig = self.modelConf? self.modelConf : Facade.getConf(self.metadata.modelRelativeName,'edit')  //new EditConfs();
        if ($.inArray('status',viewConfig.fields) < 0)
            viewConfig.fields.push('status');
        //viewConfig.fields.push('status');// = ['status','id'];
        if ($.inArray('id',viewConfig.fields) < 0) {
            viewConfig.fields.push('id');
        }

        viewConfig.fields_type.status = {type:'input',inputType:'hidden'};
        //viewConfig.fields_type.id = {type:'input',inputType:'hidden'};
        viewConfig.langs = self.langs;
        //console.log('HASMANY config',viewConfig,viewConfig.fields);

        var tmpContainer = null;
        if (self.itemEditTemplate) {
            tmpContainer = $.createDynamicContainer(self.itemEditTemplate);
        } else {
            tmpContainer = $.createDynamicContainer('#'+self.prefixTemplateClass + "_hasmany_item_tpl");
        }



        tmpContainer.find('[data-hasmany_item]').attr('data-hasmany_item',tmpContainer.attr('id'));
        jQe.find('[data-render_list="' + self.key + '"]').append(tmpContainer.html());

        viewConfig.container = '[data-hasmany_item="'+ tmpContainer.attr('id') +'"]';

        tmpContainer.remove();
        /*
         var viewData = {
         value : values,
         translations : {},
         metadata : self.metadata,
         resultParams : self.resultParams
         };
         */
        var viewData = {
            value : values,
            translations : self.jsonData.translations,
            metadata : self.jsonData.metadata,
            resultParams : self.jsonData.resultParams
        };

        var view = new ViewEdit(viewModelName,viewConfig,viewData);
        view.hasManyIndex = self._views.length;
        view.isHasMany = true;
        self._views.push(view);
        $(viewConfig.container).attr('data-view_index',view.hasManyIndex);
        view.render();
        console.log('VIEW: ',view);

    },
    deleteHasManyItem : function (modelName,index,viewIndex) {
        var self = this;
        //var modelName = Utility.camelCase(self.model.resultParams[self.key].modelName);

        var hasManyContainer = $(self.container).find('[data-render_id="'+ self.key+'"]');
        var status = hasManyContainer.find('input[name="' + self.key + '-status[' + viewIndex +']"]').val();
        log.debug("deleteHasManyItem index" , viewIndex , " status ", status);
        //hasManyContainer.find()

        if (status == "new") {
            hasManyContainer.find('[data-hasmany_item_structure]:eq('+index+')').remove();
        } else {
            hasManyContainer.find('input[name="' + self.key + '-status[' + viewIndex +']"]').val('deleted');

            //hasManyContainer.find('input[name="' + self.key + '-status[]"]:eq('+index+')').attr("value",'deleted');
            hasManyContainer.find('[data-hasmany_item_structure]:eq('+index+')').addClass("hide");

        }
    },
    // ridefinire questa funzione pre prendere i dati giusti per il riempimento della form
    // hasmany
    getJsonData : function (callback) {
        var jsonData = [];
        return callback(jsonData);
    }
});
/**
 * VERSIONE LIBRERIA 3
 */
var RenderHasmanyThrough = Render.extend({
    type : 'hasmany_through',
    classData : 'hasmany_through',
    classTemplate : 'hasmany_through',
    selected : [],
    modelName : "none",
    last_searched_result : null,  // json risultato dell'ultima ricerca
    hasmany_container : '[data-hasmany_container]',
    selected_container : '[data-selected_container]',
    title_selector : '[data-render_title]',
    autocompleteModel : null,
    morph : null,
    label_field : null,
    addNew : false,
    searchField : null,
    searchDescription : null,
    itemAddTemplate : null,
    itemViewTemplate : null,
    listItemsTemplate : null,

    init: function (key,config) {
        this._super(key,config);
        this.selected = [];
        this.last_searched_result = null;
        if (!this.itemViewTemplate)
            this.itemViewTemplate = '#' + this.prefixTemplateClass + '_hasmany_through_view_item_tpl';
        if (!this.itemAddTemplate)
            this.itemAddTemplate = '#' + this.prefixTemplateClass + '_hasmany_through_addeditem_tpl';
        if (!this.listItemsTemplate)
            this.listItemsTemplate = '#' + this.prefixTemplateClass + '_hasmany_through_listitem_tpl';
    },

    _renderView : function (jQe) {
        var self = this;
        //log.info("RenderHasmany view ", self.data);
        if (self.value && self.value.length > 0) {
            var tpl = self.itemViewTemplate;
            for (var i in self.value) {
                var fields = self.fields ? self.fields:[];
                var itemData = _.omit(self.value[i],['pivot']);
                if (self.fields && self.fields.length > 0) {
                    itemData = _.pick(itemData,self.fields);
                }
                var items = [];
                var itemsByKey = {}; // accesso con key per dati conosciuti
                // items e' in fomato vettore per poterci accedere items[n].key item[n].value in caso
                // di dati non conosciuti a priori

                for (var k in itemData) {
                    items.push({key:k,value:itemData[k]})
                    itemsByKey[k] = itemData[k];
                }
                var tplData = {
                    items : items,
                    itemsByKey : itemsByKey
                }
                var html = $.getTemplate(tpl,tplData);
                $(jQe).find('[data-render_list]').append(html);
            }
            return ;

        }
    },
    _finalizeView : function () {

    },
    _renderEdit : function (jQe) {
        var self = this;
        jQe.find(self.hasmany_container).attr('data-hasmany_container',self.key);
        jQe.find(self.selected_container).attr('data-selected_container',self.autocompleteModel);
        jQe.find(self.title_selector).html($.translate('model-'+self.autocompleteModel));
        var exists = self.key + "_exists";
        $('<input>').attr({
            type: 'hidden',
            name: exists,
            value : 1
        }).appendTo(jQe);
    },
    _finalizeEdit : function () {
        var self = this;
        self.selected = [];
        $.translateDocument(self.container);
        log.debug('hasmany_through',self.value,self.config);
        var morph_id = null;
        var morph_type = null;
        for (var i in self.value) {
            var item = self.value[i];
            var id = item.id;
            //log.debug("Item: ",item);
            if (self.morph) {
                morph_id = item[self.morph.id];
                morph_type = item[self.morph.type];
                id = morph_type + '_' + morph_id
            }
            self._addItem(id, item[self.label_field], morph_type, morph_id,item);
        }

        self._populate("");
        //var modelName = Utility.camelCase(self.model.resultParams[self.key].modelName);


        $(self.container).find('[data-search]').change(function () {
            self._populate($(this).val());
        });
        if (self.addNew) {

            $(self.container).find('[data-button_add]').click(function () {
                log.info("insert " + self.modelName);
                var tplView = "<viewinsert id='addnewView' model='" + self.modelName + "'></viewinsert>";
                $('#generalDialog .modal-body').html(tplView);
                Facade.parse('#generalDialog .modal-body');
                var keyId = Facade.getKeyFromId('addnewView');
                $.generalDialog(null,{btok_label:"Salva"}).ok(function () {
                    alert('keyid' + keyId);
                    Facade.controller.actionSave(keyId,null,{},function (json) {
                        Facade.removeView(keyId);
                        if (json.error) {
                            $.errorDialog(json.msg);
                            return ;
                        }
                        self.container.find('[data-search]').trigger('change');
                    });
                }).cancel(function () {
                    Facade.removeView(keyId);
                })
            })
        } else {
            $(self.container).find('[data-button_add]').addClass('hide');
        }
        $(self.container).find(".sort_class").sortable({
            handle: '.button-move',
        });
    },
    _populate : function (filter) {
        var self = this;
        var list_container = $(self.container).find('[data-hasmany_container="'+ self.key +'"]');
        // unbind vecchi click
        $(list_container).find('[data-add]').unbind('click');
        $(list_container).html($('#default_spinner_tpl').html());
        //$.waitStart();
        var url = null;
        var morph = self.morph;
        var label_field = self.label_field;
        var url = "/api/json/autocomplete/"+self.autocompleteModel+"?term="+filter;
        if (self.search_field)
            url += "&field="+self.search_field;
        if (self.search_description)
            url += "&description="+self.search_description;
        if (self.metodo)
            url += "&method="+self.metodo;

        $.get(Facade.getUrl(url),function (json) {
            if (json.error) {
                $.errorDialog(json.msg);
                return ;
            }
            delete self.last_searched_result;
            self.last_searched_result = json.result;

            $.renderTemplate(self.listItemsTemplate,list_container,json.result);
            $(list_container).find('[data-add]').click(function () {
                if (morph) {
                    var id = $(this).data('morph_type') + '_' + $(this).data('morph_id');
                } else {
                    var id = $(this).data('id');
                }
                var el = json.result.find(function (o) { return o.id == id; });
                var data = el  && el.data?el.data:null;
                self._addItem(id,$(this).data('label'),$(this).data('morph_type'),$(this).data('morph_id'),data);
            });
        }).fail(function (e) {
            log.error(e);
            $.errorDialog($.getFailMessage(e) );
        })
    },
    _addItem : function (id,label,morph_type,morph_id,json) {
        var self = this;
        if (!isNaN(id)) {
            id = parseInt(id);
        }

        if ($.inArray(id,self.selected) >= 0) {   // elemento gia' inserito
            return false;
        }
        log.debug("Add item id: ",id);
        self.selected.push(id);
        //var modelName = Utility.camelCase(self.model.resultParams[self.key].modelName);
        //console.log('added_container',self.container,'[data-selected_container="'+ self.modelName +'"]');
        var added_container = $(self.container).find('[data-selected_container="'+ self.autocompleteModel +'"]');
        //console.log(added_container.length,' added containet',added_container);
        if (!json) {
            for (var i in self.last_searched_result) {
                if (morph_id) {
                    //console.log('check',self.last_searched_result[i].morph_id,morph_id,self.last_searched_result[i].morph_type,morph_type);
                    if ( self.last_searched_result[i].morph_id == morph_id &&
                        self.last_searched_result[i].morph_type == morph_type  ) {
                        json = self.last_searched_result[i].data;
                        break;
                    }
                } else {
                    if ( self.last_searched_result[i].id == id) {
                        json = self.last_searched_result[i].data;
                        break;
                    }
                }

            }

            if (!json) {// non ho trovato nulla
                json = {};
                log.warn("nono trovato nulla " + id)
            }
        }

        //var json = {'id': id,label:label,status:"new",'morph_type':morph_type,'morph_id':morph_id};
        // setto i valori necessari per l'item oltre a quelli opzionali dell'intero modello
        json.id = id;
        json.label = label;
        json.status = 'new';
        json.morph_type = morph_type;
        json.morph_id = morph_id;
        json.morph = false;
        if (self.morph)
            json.morph = true;
        // prendo il template per un nuovo item
        var obj = $.createDynamicContainer(self.itemAddTemplate);
        //var old_html = $(added_container).html();
        $.renderTemplate(obj,obj,json);
        // assegno i nomi giusti dei campi nascosti per la form
        // tenendo conto se si trova in un hasmany il nome di vettore e' composto diversamente
        $.each(obj.find('input,textarea,select'), function (k, nameval) {
            var name = self._getFieldName($(this).data('field'));
            $(this).attr('name', name);
        });
        //console.log('html',obj.html())
        // aggiorno l'html della lista con il nuovo elemento
        //$(added_container).html(old_html+obj.html());
        $(added_container).append(obj.html());
        obj.remove();
        // assegno gli eventi per la delete dell'oggetto
        $(added_container).find('[data-button_delete]').unbind('click');
        $(self.container).find('[data-button_delete]').click(function () {
            var index = $(this).closest("[data-hasmany_through_item]").index();
            self._deleteItem(index);
        });
        // trigger che sono stati modificati i valori
        $(self.container).find('[data-control_container="'+ self.key +'"]').trigger('change',[$(this)]);


    },
    _deleteItem : function (index) {
        var self = this;
        //console.log(self.selected);
        //var modelName = Utility.camelCase(self.model.resultParams[self.key].modelName);
        var added_container = $(self.container).find('[data-selected_container="'+ self.autocompleteModel +'"]');
        //console.log(self.container,'[data-selected_container="'+ self.modelName +'"]','[data-hasmany_through_item]:eq('+index+')','input[name="'+ self.key+ '-id[]"]');
        var fieldName = self._getFieldName('id');
        var item_id = $(added_container).find('[data-hasmany_through_item]:eq('+index+')').find('input[name="'+ fieldName + '"]').val();
        if (!isNaN(item_id)) {
            item_id = parseInt(item_id);
        }
        if (!item_id) {
            log.warn("_deleteItem " + self.key + " index container " + index + " id non valido " + item_id );
            log.warn('selected item ',self.selected);
            log.warn('find rule is ',self.container,'[data-selected_container="'+ self.autocompleteModel +'"]','[data-hasmany_through_item]:eq('+index+')','input[name="'+ self.key+ '-id[]"]');
            return ;
        }
        self.selected = _.without(self.selected, item_id );
        //log.info(self.selected);
        $(added_container).find('[data-hasmany_through_item]:eq('+index+')').remove();
        $(self.container).find('[data-control_container="'+ self.key +'"]').trigger('change',[$(this)]);

    },
    // assegno i nomi giusti dei campi nascosti per la form
    // tenendo conto se si trova in un hasmany il nome di vettore e' composto diversamente
    _getFieldName : function (field) {
        var self = this;
        var basename = self.key;
        var arrayname = "";
        if (self.key.indexOf('[') >= 0) {
            var basename = self.key.substr(0,self.key.indexOf('['));
            var arrayname = self.key.substr(self.key.indexOf('['));
        }
        var name = basename+"-"+field+arrayname+"[]";
        return name;
    }
});
/**
 * VERSIONE LIBRERIA 3
 */

var RenderMap = Render.extend({
    type : 'map',
    classData : 'map',
    classTemplate : 'map',
    _lat : 0,
    _lng : 0,
    _hasDbValues : false,
    address : null,
    lat_caption_selector : '[data-lat_field]',
    lng_caption_selector : '[data-lng_field]',
    lat_field_name : 'lat',
    lng_field_name : 'lng',
    dialogId : '#map_dialog',
    raggioArea : 5000,
    showArea : false,
    mapKey : null,

    getIndirizzo : function () {
        var self = this;
        return self.address?self.address:"";
    },

    _renderEdit : function (jQe) {
        var self = this;
        self._lat = self.value['lat'];
        self._lng = self.value['lng'];

        $(jQe).find(self.lat_caption_selector).html(self._lat);
        $(jQe).find(self.lng_caption_selector).html(self._lng);
    },

    _finalizeEdit : function () {
        var self = this;
        $(self.container).find('[data-button_map]').click(function () {
            $(self.dialogId).find('[data-lnk_address]').unbind('click');
            $(self.dialogId).find('[data-lnk_address]').click(function () {
                var address = $('#map_dialog').find('input[name="indirizzo"]').val();
                if (!address || address.length == 0) {
                    $.errorDialog("Inserire un indirizzo valido");
                    return ;
                }
                Render.mymap.updateMarkerAddress(0,address,function (result) {
                    //console.log("link usa indirizzo callback",result);
                    if (result.error == 0) {
                        $(self.dialogId).find('input[name="lat"]').attr('value',result.pos.lat()).val(result.pos.lat());
                        $(self.dialogId).find('input[name="lng"]').attr('value',result.pos.lng()).val(result.pos.lng());
                        self._lat = result.pos.lat();
                        self._lng = result.pos.lng();
                        Render.mymap.setCenter(self._lat ,self._lng);
                    } else {
                        $.errorDialog(result.msg);
                    }
                });

            });
            $.waitStart();
            self.activateMap(function () {
                $.waitEnd();
                self._showDialog();
            })

        })
    },
    _showDialog : function () {
        var self = this;


        var lat = self._lat;
        var lng = self._lng;
        log.info("_showDialog " + lat + ":" + lng +  " markers " + Render.mymap.markers.length);
        if (Render.mymap.markers.length == 0) {
            var marker = new GMapMarker();
            if (self.getIndirizzo())
                marker.address = self.getIndirizzo();
            //else {
            marker.lat = lat;
            marker.lng = lng;
            //}
            marker.draggable = true;

            log.debug("marker",marker);


            Render.mymap.addMarker(marker);
            Render.mymap.showQueued(function () {
                Render.mymap.markerToCenter(0);
                var marker = Render.mymap.markers[0];
                $(self.dialogId).find('input[name="'+self.lat_field_name+'"]').attr('value',marker.lat).val(marker.lat);
                $(self.dialogId).find('input[name="'+self.lng_field_name+'"]').attr('value',marker.lng).val(marker.lng);
            })
        } else {
            Render.mymap.updateMarker(0, {lat:lat,lng:lng});
        }
        $(self.dialogId).find('input[name="indirizzo"]').attr('value',self.getIndirizzo()).val(self.getIndirizzo());
        $(self.dialogId).find('input[name="lat"]').attr('value',lat);
        $(self.dialogId).find('input[name="lng"]').attr('value',lng);

        if (self.showArea) {
            $(self.dialogId).find('[data-area_container]').removeClass('hide');
            var input = $(self.dialogId).find('[data-input_raggio]');
            $(input).val(self.raggioArea);

            Render.mymap.showArea({raggio:parseInt($(input).val())})
            $(input).bind('change',function () {
                self.raggioArea = parseInt($(input).val());
                Render.mymap.showArea({raggio:parseInt($(input).val())})
            });

        }

        $(self.dialogId).modal('show').ok(function () {
            self._lat = Render.mymap.markers[0].lat;
            self._lng = Render.mymap.markers[0].lng;
            self.setLatLngValues();

        });

        setTimeout(function () {
            if (Render.mymap.markers[0].address) {
                $('#map_dialog').find('[data-lnk_address]').click();
            } else {
                Render.mymap.setCenter(lat,lng);
            }

        },1000);


    },
    setLatLngValues : function() {
        var self = this;
        //$(self.container).find('input[name="'+self.lat_field+'"]').val(self._lat).attr('value',self._lat);
        //$(self.container).find('input[name="'+self.lng_field+'"]').val(self._lng).attr('value',self._lng);
        $(self.container).find('[data-lat_field]').html(self._lat);
        $(self.container).find('[data-lng_field]').html(self._lng);
        var params = {}
        if (self.lat_field)
            params[self.lat_field] = self._lat;
        if (self.lng_field)
            params[self.lng_field] = self._lng;
        self._emitEvent('change',params);
    },
    activateMap : function(callback) {
        var self = this;
        if (!Render.mymap) {
            Render.mymap = new GMap('Render.mymap');
            Render.mymap.apiKey = self.mapKey;
            Render.mymap.elementId = "gmap";
            Render.mymap.zoom = 8;//parseInt($.cookie('zoom'))? parseInt($.cookie('zoom')): 16;
            Render.mymap.lat = self._lat;
            Render.mymap.lng = self._lng;
            Render.mymap.language = "it";
            Render.mymap.markerDragend = function (pos,marker) {
                log.debug('pos',pos.lat(),pos.lng());
                $('#map_dialog').find('input[name="lat"]').attr('value',pos.lat()).val(pos.lat());
                $('#map_dialog').find('input[name="lng"]').attr('value',pos.lng()).val(pos.lng());
                self._lat = pos.lat();
                self._lng = pos.lng();
            }
            Render.mymap.afterLoadScript = function() {
                //$.waitEnd();

            };
            Render.mymap.afterInitialize = function() {
                console.log('afterInitialize');
                setTimeout(function () {
                    google.maps.event.trigger(Render.mymap.gmap, 'resize');

                },500);
                //self._showDialog();
                callback();

            }
            Render.mymap.loadScript();

        } else {
           // $.waitEnd();
            //self._showDialog();
            setTimeout(function () {
                google.maps.event.trigger(Render.mymap.gmap, 'resize');

            },500);
            callback();
        }
    }
});
/**
 * VERSIONE LIBRERIA 3
 */
var RenderBelongsto =  Render.extend({
    type : 'belongsto',
    classData : 'belongsto',
    classTemplate : 'belongsto',
    itemViewTemplate : null,
    separator : null,
    fields: {},
    nullLabel : '',

    _renderView : function(jQe) {
        var self = this;
        // TODO inserire anche i template per i belongsto
        /*
        var values = "";
        if (self.value) {
            for (var i in self.fields) {
                var f = self.fields[i];
                values += self.value[f] + " ";
            }
        }
        jQe.find('[data-render_element]').html(values);
        */
        if (!self.value) {
            jQe.find('[data-render_element]').html(self.nullLabel);
            return ;
        }

        if (self.itemViewTemplate) {
            var html = $.getTemplate(self.itemViewTemplate,self.value);
            jQe.find('[data-render_element]').html(html);
            return ;
        }
        var separator = self.separator?self.separator:" ";
        var label = "";
        //console.log('datai',self.value[i]);
        for (var fi in self.fields) {
            var field = self.fields[fi];
            label+= self.value[field];
            if (fi < self.fields.length-1)
                label+= separator;
        }

        jQe.find('[data-render_element]').html(label);

    },
    _finalizeView : function() {

    }
});
/**
 * VERSIONE LIBRERIA 3
 */
var RenderCaptcha = Render.extend({
    type : 'captcha',
    classData : 'captcha',
    classTemplate : 'captcha',
    captcha_img_selector : '[data-captcha_img]',
    _renderEdit : function(jQe) {
        var self = this;
        var el = jQe.find('[data-render_control]');
        el.attr("name", self.key);
        el.attr("value", self.value);
        var src = jQe.find('img').prop('src');
        src += '&rand='+Math.floor((Math.random() * 10000) + 1);
        jQe.find(self.captcha_img_selector).prop('src',src);
    },
    _finalizeEdit : function() {
        var self = this;
        $(self.container).find('[data-captcha_img]').addClass('captchajs');
        $(self.container).find('[data-button_reload]').click(function () {
            self.reload();
        });
        self.reload();
    },
    reload : function () {
        var self = this;
        $.get(Facade.getUrl('/captchajs_img'),{},function (html) {
            $(self.container).find('[data-captcha_img]').html(html);
        });
        //$(cssClass).html(html);
        //$(self.config.container).find('[data-captcha_img]').prop('src',"/captchajs_img?rand="+(Math.random()*1000) );
        //});
    }
});

// metodo statico per il ricaricamento del captcha
Render.loadCaptcha = function ( cssClass ) {
    if (!cssClass) {
        cssClass = '.captchajs';
    }

    $.get(Facade.getUrl('/captchajs'),{},function (html) {
        $(cssClass).html(html);
    });
}

/**
 * VERSIONE LIBRERIA 2
 */
var RenderFaicon = Render.extend({

    prefix : 'fa-' ,
    _oldIcon : null,
    type : 'faicon',
    classData : 'faicon',
    classTemplate : 'faicon',
    _renderView : function(jQe) {
        var self = this;
        var icon = self.prefix+self.value;
        var valueIcon = self.value;
        var viewicon = jQe.find('.selected-icon');
        viewicon.addClass(icon);
        self._oldIcon = valueIcon;
    },
    _finalizeView : function() {

    },
    _renderEdit : function(jQe) {
        var self = this;
        var icon = self.prefix+self.value;
        var valueIcon = self.value;
        var el = jQe.find('[data-control]');
        el.attr("name", self.key);
        el.attr("value", valueIcon);
        var viewicon = jQe.find('.selected-icon');
        viewicon.addClass(icon);
        self._oldIcon = valueIcon;
    },
    _finalizeEdit : function() {
        var self = this;
        $(self.container).find('[data-button_faicon]').click(function () {
            $.get(Facade.getUrl("/faiconsjs"), {},function (html) {
                self._showDialog(html);
            });
        })
    },
    _showDialog : function (html) {
        var self = this;

        var icon = self.prefix+self._oldIcon;
        var valueIcon = self._oldIcon;


        $('#faicon_dialog').find('.currentIcon').addClass(icon);
        $('#faicon_dialog').find('.selectedIcon').addClass(icon);
        $('#faicon_dialog').find('#faicons').html(html);

        $('#faicon_dialog').find('.select-fa-icon').click(function() {
            var currentValueIcon = $(this).attr('title').substr(self.prefix.length);
            var currentIcon = self.prefix+currentValueIcon;
            console.log(currentIcon);
            $('#faicon_dialog').find('input[name="selectedIcon"]').val(currentValueIcon);

            $('#faicon_dialog').find('.selectedIcon').removeClass(icon);
            $('#faicon_dialog').find('.selectedIcon').addClass(currentIcon);

            //self._oldIcon = currentIcon;

        });
        $('#faicon_dialog').modal('show').ok(function () {
            var value = $('#faicon_dialog').find('input[name="selectedIcon"]').val();
            var el = $(self.container).find('input[name="'+self.key+'"]');
            el.attr("value",value);
            var viewicon = $(self.container).find('.selected-icon');
            viewicon.removeClass(icon);
            viewicon.addClass(self.prefix+value);
            self._oldIcon = value;
        });


    }
});

/**
 * VERSIONE LIBRERIA 3
 */
var RenderInputHelped = Render.extend({
    customValue : true,
    type : 'input_helped',
    classData : 'input_helped',
    classTemplate : 'input_helped',
    domainValues : {},

    init: function (key,config) {
        this._super(key,config);
        if (_.has(config,'customValue')) {
            this.customValue = config.customValue;
        }
    },
    _setData : function (jQe) {
        var self = this;
        //_.has

        var el = jQe.find('[data-option_values]');
        var tplData = [];
        for(var k in self.domainValues) {
            tplData.push({value:k,label:self.domainValues[k]});
        }
        $.renderTemplate(el,el,tplData);
        return ;
    },
    _renderEdit : function (jQe) {
        var self = this;
        self._setData(jQe);
        var el = jQe.find('[data-render_control]');
        el.attr("name", self.key);

        if (!self.customValue) {
            el.attr('readonly','true');
            if (_.indexOf(_.keys(self.domainValues),self.value) >= 0)
                el.attr('value',self.value);
        } else {
            el.attr('value',self.value);
        }
    },

    _finalizeEdit : function(){
        var self = this;
        $(self.container).find('[data-option_values]').find('button').click(function() {
            var el = $(self.container).find('[data-render_control]');
            el.attr('value',$(this).data('value'));
            self._emitEvent('change',$(this).data('value'));
        });
    },

    setDomainValues : function (values) {
        var self = this;
        self.data.domainValues = values;
        self._setData(self.config.container);
    },
    setValue : function(value) {
        var self = this;
        $(self.config.container).find('[data-render_control]').val(value);
    }
});

/**
 * VERSIONE LIBRERIA 3
 */
var RenderMultiUpload = RenderHasmanyUpload.extend({
    dzObj : null,
    regFile : /(?:\.([^.]+))?$/,
    type : 'multi_upload',
    classData : 'multi_upload',
    classTemplate : 'multi_upload',
    init : function (key,config) {
        this._super(key,config);
    },
    _getTemplate : function () {
        var self = this;
        var tplId = self.templateId;
        if (!tplId) {
            tplId = '#'+self.prefixTemplateClass+"_multi"+self.uploadType+"_"+self.mode+"_tpl";
            if ($(tplId).length == 0)
                tplId = '#'+self.prefixTemplateClass+"_multi"+self.type+"_tpl";
            if ($(tplId).length == 0)
                throw "Template source " + '#'+self.prefixTemplateClass+"_multi"+self.uploadType+"_"+self.mode+"_tpl Not found";
        }

        return $.createDynamicContainer(tplId);
    },
    addItem : function () {
        var self = this;
        log.info("action multi upload " + self.key + " type " + self.uploadType);
        var body = $.createDynamicContainer('#' + self.prefixTemplateClass + '_multi' + self.uploadType + '_dialog_upload_tpl');
        var modelName = self.modelName;

        var params = {
            "modelName": Utility.camelCase(modelName),
            "random_id" : "tdialog" + self.uploadType,
            "langs" : self.langs

        }
        $.renderTemplate('#'+body.attr('id'), '#'+body.attr('id'), params);

        //var body = $('#' + _layout + '_dialog_upload_foto_tpl');
        //var html = $.parseTemplate(body.html(), {"modelName": self.modelName});
        var dialogId = '#upload_multi' + self.uploadType + '_dialog';
        $(dialogId + ' .modal-body').html(body.html());
        $(dialogId + ' .modal-body').css('height',300).css('over-flow','show');
        body.remove();
        var formId = 'formDrop'; // 'multi_'+ (new Date().getTime());
        $(dialogId + ' form').attr('id',formId);
        // @TODO do per scontato l'utilizzo di smarty admin

        $(dialogId + ' .btok');//x.addClass("disabled");

        $(dialogId).modal('show').ok(function () {
            //console.log(self.dzObj);//.files.getAcceptedFiles());
            //console.log(self.dzObj.files);//.files.getAcceptedFiles());
            //console.log(self.dzObj.getAcceptedFiles());
            var files = self.dzObj.getAcceptedFiles();
            for(var i in files) {
                var file = files[i];
                var formData = $(dialogId + ' form').serializeAssoc();
                formData.updated_at  = new Date();
                // TODO fare la versione per le lingue controllare le lingue
                formData.name = file.formData.filename;
                formData.filename = file.formData.filename;
                formData.mimetype= file.formData.type;
                formData.ext = file.formData.ext;//self.regFile.exec(file.name);
                formData.random= file.formData.random;
                formData.original_name = file.formData.original_name;
                self.renderNewItem(formData);
            }
            /*
             var formData = $(dialogId + ' form').serializeAssoc();
             // self.viewObj.addFotoItem(formData,key);
             formData.updated_at  = new Date();
             self.renderNewItem(formData);
             */
        }).cancel(function () {
            //alert('cancel');
        })
        $(dialogId).on('shown.bs.modal', function (e) {
            loadScript(plugin_path + 'dropzone/dropzone.js', function() {
                if (!self.dzObj) {
                    self.dzObj = new Dropzone('#' + formId, //$('#'+formId).dropzone(

                        {
                            init: function () {
                                console.log("INIT");
                                this.on("addedfile", function (file) {
                                    console.log("addedfile",$(file.previewElement).find('.dz-error-mark').length);
                                    var _this = this;
                                    $(file.previewElement).find('[data-btn_remove]').click(function () {
                                        _this.removeFile(file);
                                    });
                                    /*
                                     // Create the remove button
                                     var removeButton = Dropzone.createElement("<button class='btn btn-sm btn-default fullwidth margin-top-10'>Remove file</button>");

                                     // Capture the Dropzone instance as closure.
                                     var _this = this;

                                     // Listen to the click event
                                     removeButton.addEventListener("click", function (e) {
                                     // Make sure the button click doesn't submit the form:
                                     e.preventDefault();
                                     e.stopPropagation();

                                     // Remove the file preview.
                                     _this.removeFile(file);
                                     // If you want to the delete the file on the server as well,
                                     // you can do the AJAX request here.
                                     });

                                     // Add the button to the file preview element.
                                     file.previewElement.appendChild(removeButton);
                                     */
                                });
                                this.on('success', function (file, json) {
                                    console.log(file, json);
                                    if (json.error) {
                                        this.removeFile(file);
                                        $.errorDialog(json.msg);
                                        return;
                                    }
                                    file.formData = {};
                                    file.formData.ext = json.result.ext;
                                    file.formData.filename = json.result.filename;
                                    file.formData.mimetype = json.result.mimetype;
                                    file.formData.original_name = json.result.original_name;
                                    file.formData.random = json.result.random;
                                })
                            },
                            previewTemplate: $('#multifoto_preview_item_tpl').html()
                        });
                }
                console.log(self.dzObj);
                /*
                 Dropzone.options.formDrop = {
                 init: function() {
                 console.log("INIT");
                 this.on("addedfile", function(file) {
                 console.log("addedfile");
                 // Create the remove button
                 var removeButton = Dropzone.createElement("<button class='btn btn-sm btn-default fullwidth margin-top-10'>Remove file</button>");

                 // Capture the Dropzone instance as closure.
                 var _this = this;

                 // Listen to the click event
                 removeButton.addEventListener("click", function(e) {
                 // Make sure the button click doesn't submit the form:
                 e.preventDefault();
                 e.stopPropagation();

                 // Remove the file preview.
                 _this.removeFile(file);
                 // If you want to the delete the file on the server as well,
                 // you can do the AJAX request here.
                 });

                 // Add the button to the file preview element.
                 file.previewElement.appendChild(removeButton);
                 });
                 }
                 }
                 $('#'+formId).dropzone();
                 */
            });  // do something...
        })

    },
})
/**
 * VERSIONE LIBRERIA 3
 */

/**
 * RenderRange
 *
 **/
var RenderRange = Render.extend({
    type : 'range',
    classData : 'range',
    classTemplate : 'range',
    domainValuesOrder : null,
    domainValues: {},
    operator : null,
    control_selector_start : '[data-render_control_start]',
    control_selector_end : '[data-render_control_end]',
    render_start : '[data-render_start]',
    render_end : '[data-render_end]',

    _setData : function (jQe) {
        var self = this;
        self._setSelectValues(jQe.find(self.render_start),self.value);
        self._setSelectValues(jQe.find(self.render_end),self.end_value);
    },

    _setSelectValues : function(container,value) {
        //ORDINAMENTO DELLE OPTIONS
        var self = this;
        var el = container;
        console.log(container,value);
        var vs = [];
        if (self.domainValuesOrder) {
            vs = self.domainValuesOrder;
        } else {
            vs = _.sortBy(_.keys(self.domainValues), function (num) {
                return num;
            });
        }
        var el =
        el.html('');
        for (var i = 0; i < vs.length; i++) {
            //for (var v in self.data.domainValues) {
            var v = vs[i];

            //console.log('OPTIONS: ',v);
            var selected = false;
            if (v == value) {
                selected = true;
            }
            var opt = $('<option>').attr({
                value : v
            });
            if (selected)
                opt.attr('selected','selected');
            opt.html(self.domainValues[v]);
            el.append(opt);
        }
        el.attr("value", value);
    },
    _renderSearch : function (jQe) {
        var self = this;
        self._setData(jQe);
        var el = jQe.find(self.control_selector_start);
        el.attr("name", 's_' + self.key + '[]').attr('value',self.value);

        var el = jQe.find(self.control_selector_end);
        el.attr("name", 's_' + self.end_key + '[]').attr('value',self.end_value);

        $('<input>').attr({
            type: 'hidden',
            name: 's_' + self.key + "_operator",
            'data-control_operator' : self.key,
            value : self.operator
        }).appendTo(jQe);
    },
    _renderEdit : function (jQe) {
        var self = this;
        self._setData(jQe);
        var el = jQe.find(self.control_selector_start);
        var name = self.key;
        var exists = self.key.indexOf('[]') > 0?self.key.slice(0,-2)+'_exists[]':self.key+'_exists';
        el.attr("name", name).attr('value',self.value);

        var el = jQe.find(self.control_selector_end);
        var name = self.end_key;
        var exists = self.end_key.indexOf('[]') > 0?self.end_key.slice(0,-2)+'_exists[]':self.end_key+'_exists';
        el.attr("name", name).attr('value',self.end_value);

        // // creazione campo nascosto per checkare la presenza del campo
        // $('<input>').attr({
        //     type: 'hidden',
        //     name: exists,
        //     value : 1
        // }).appendTo(jQe);
    },
    _finalizeEdit : function(){
        var self = this;
        var jq_start = $(self.container).find(self.control_selector_start);
        var jq_end = $(self.container).find(self.control_selector_end);

        $(self.container).find(self.render_start).change(function() {
            jq_start.val($(this).val());
            var value = {
                start : jq_start.val(),
                end : jq_end.val()
            }
            self._emitEvent('change',value);
        });
        $(self.container).find(self.render_end).change(function() {
            jq_end.val($(this).val());
            var value = {
                start : jq_start.val(),
                end : jq_end.val()
            }
            self._emitEvent('change',value);
        });
    },
    _finalizeSearch : function(){
        var self = this;
        self._finalizeEdit();
    },
    _finalizeView : function(){},

    setDomainValues : function (values,valuesOrder) {
        var self = this;
        self.domainValues = values;
        if (valuesOrder) {
            self.domainValuesOrder = valuesOrder;
        } else {
            self.domainValuesOrder = null;
        }
        self._setData(self.container);
    },
    setValue : function(value) {
        var self = this;
        if ('start' in value)
            $(self.container).find(self.render_start).val(value.start).change();
        if ('end' in value)
            $(self.container).find(self.render_end).val(value.end).change();
    }
});
/**
 * VERSIONE LIBRERIA 2
 */

/**
 * GMap 
 * oggetto per la gestione di punti geografici che si appoggia su google maps
 * autore : Pier Paolo Ciullo
 * email : ciullo@gmail.com
 **/


function GMapMarker () {
	this.id = null;
	this.address = "";
	this.txt = "";
	this.lat = null;
	this.lng = null;
	this.title = "";
	this.icon = null;
    this.labelClass = null; //Marker con label
    this.labelAnchor = null; //Marker con label
    this.labelContent = null; //Marker con label
	this.googlem = null;  			// riferimento al marker google
	this.draggable = false;
	this.click_callback = null;  	// callback da definire in caso si vuole intercettare il click.
	this.mouseover_callback = null;
	this.mouseout_callback = null;
	this.data = null;	 			// eventuali dati privati custom da associare al marker
	this.infoWindow = null;			// eventuale popup creata
	this.route_address = "";	    // in caso venga calcolato un percorso viene associata il risultato della route calcolata
}


/**
 *
 * @param objName: nome js dichiarato nel codice chiamante, serve per la callback google
 * @param mapOptions : opzioni da passare all'oggetto di googlemaps
 * @returns
 */

function GMap(objName,mapOptions) {
	var self = this;
    this.markerLabel = false;
    this.markerLabelScript = ""; // libreria per la gestione dei marker con css e label
	this.gmap = null;
	this.geocoder = null;
	this.centerAddress = null;  // da settare se vogliamo centrare la mappa ad un certo indirizzo
	this.lat = 42;
	this.lng = 13;
	this.zoom = 6;
	this.elementId = "map_canvas";
	this.objName = objName;
	this.markers = [];
	this.areas = [];
	this.current = 0;
	this.delay = 1000;
	this.infowindowprec = null;
	this.mapTypeId = "ROADMAP";
	//this.googleMarkers = new Array();
	this.directionsService = null;
	this.directionsDisplay = null;
	this.directionsPanelId = null;
	this.language = "it";
	this.queuedMarker = [];
	this.mapOptions = mapOptions?mapOptions:{}; // opzioni della mappa
	this.apiKey = null;//"AIzaSyBoG8WGobCO2OS_GH48eMNj4DFECFc93oA";
	this.version = null; // version libreria gmap, null prende quella corrente
	/**
	 * controlla che se i markers aggiunti con addMarker hanno un indirizzo, invece delle coordinate.
	 * se si, attiva il servizio di geolocalizzazione di google con timeout di 1 secondo per poter fare le 
	 * chiamate in background a fine servizio chiama la successCb
	 * 
	 */
	this.showQueued = function (successCb,errorCb) {
		successCb = successCb?successCb:function () {};
		errorCb = errorCb?errorCb:function () {};
		
		var _showQueued = function () {
			log.info('_showQueued ' + self.queuedMarker.length );
			if (self.queuedMarker.length > 0) {
				var marker = self.queuedMarker.pop();
				self.geocoder.geocode( { 'address': marker.address }, function(results, status) {
					if (results) {
						var foundOk = false;
						$.each(results, function(key, item) {
							if (status==google.maps.GeocoderStatus.OK) {

								var point = new google.maps.LatLng(item.geometry.location.lat(), item.geometry.location.lng());
								marker.lat = item.geometry.location.lat();
								marker.lng = item.geometry.location.lng();
								self.showAddressByPoint(point,marker);
								foundOk = true;
							}
						});
						if (!foundOk) {
							//marker.lat = self.lat;
							//marker.lng = self.lng;
							//self.showMarker(marker);
							var point = new google.maps.LatLng(marker.lat, marker.lng);	
							self.showAddressByPoint(point,marker);
						}
					} else {
						var point = new google.maps.LatLng(marker.lat, marker.lng);	
						self.showAddressByPoint(point,marker);
					}
					setTimeout(function () {
						_showQueued();
					},self.delay);
			   });
			} else {
				successCb();
			}
		}
		log.info('GMap.showQueued ',self.markers)
		for (var i in self.markers) {
			var marker = self.markers[i];
			if (marker.googlem != null)
				continue;
			if (marker.lat && marker.lng) {
				var point = new google.maps.LatLng(marker.lat, marker.lng);	
				self.showAddressByPoint(point,marker);
			} else  {
				if (marker.address != "") {
					self.queuedMarker.push(marker);
				} else {
					var point = new google.maps.LatLng(self.lat, self.lng);
					self.showAddressByPoint(point,marker);
				}
			}
		
		}
		if (self.queuedMarker.length == 0) {
			return successCb();
		}
		
		// chiamata funzione ricorsiva;
		_showQueued();
		
	};
	
	this.updateMarkerAddress = function (index,address,callback) {
		callback=callback?callback:function () {};
		self.geocoder.geocode( { 'address': address }, function(results, status) {
			if (status==google.maps.GeocoderStatus.ZERO_RESULTS) {
				return callback({msg:'Zero risulati',error:1});
			}
			if (results) {
				var found = 0;
				$.each(results, function(key, item) {

					if (status==google.maps.GeocoderStatus.OK && !found) {
						found = 1;
						var point = new google.maps.LatLng(item.geometry.location.lat(), item.geometry.location.lng());
						self.markers[index].lat = item.geometry.location.lat();
						self.markers[index].lng = item.geometry.location.lng();
						self.markers[index].googlem.setPosition(point);
						self.updateArea(index);

					}
				});
				if (found) {
					callback({msg:'',error:0,pos:self.markers[index].googlem.getPosition()});
				} else {
					callback({msg:'Error not found ',error:1,pos:{} });
				}
			} else {
				callback({msg:"errore generale",error:1,pos:{},status:status,result:result});
			}

	   });
	};
	
	this._initialize = function() {
		
		try {
			
			var myLatlng = new google.maps.LatLng(self.lat,self.lng);
			var myOptions = {
					zoom: self.zoom,
					center: myLatlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			for (var k in self.mapOptions) {
				myOptions[k] = self.mapOptions[k];
			}
			//console.log(myOptions);
			self.gmap = new google.maps.Map(document.getElementById(self.elementId), myOptions);
			setTimeout(function () {
				self.geocoder = new google.maps.Geocoder();

				if (self.centerAddress) {
					self.geocoder.geocode( { 'address': self.centerAddress }, function(results, status) {
						if (results) {
							$.each(results, function(key, item) {
								if (status==google.maps.GeocoderStatus.OK) {

									var point = new google.maps.LatLng(item.geometry.location.lat(), item.geometry.location.lng());
									self.gmap.setCenter(point);

								}
							});
						}
				   });
				}
				var rendererOptions = {
			      map: self.gmap,
			      suppressMarkers : true,
			      preserveViewport: true
			    };
				self.directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
				if (self.directionsPanelId)
					self.directionsDisplay.setPanel(document.getElementById(self.directionsPanelId));
				//self.directionsDisplay.setMap(self.gmap);
				
				//self.showMarkers();
				// events
				google.maps.event.addListener(self.gmap, 'zoom_changed', function() {
					self.zoom_changed();
					//log.info("zoom activate " + self.gmap.getZoom());
				});
				google.maps.event.addListener(self.gmap, 'bounds_changed', function(event) {
					self.bounds_changed(event);
					//log.info("zoom activate " + self.gmap.getZoom());
				});

				self.afterInitialize();
			},500);
			
		} catch (e) {
			log.error(e);
		}
	}
	this.initialize =  function () {
		if (self.markerLabel) {
			self.loadMarkerWithLabelScript(function () {
				self._initialize();
			})
		} else 
			self._initialize();
		
	};

	this.geocodingResults = function (address,callback) {
		self.geocoder.geocode( { 'address': address }, function(results, status) {
			eval(callback + "(results)");
		});
	};

	this.getGeocodingResults = function (address,callback) {
		self.geocoder.geocode( { 'address': address }, function(results, status) {
			callback(results,status);
		});
	};
	this.showAddress = function (address,gmarker) {

		self.geocoder.geocode( { 'address': address }, function(results, status) {
			$.each(results, function(key, item) {
				if (status== google.maps.GeocoderStatus.OK) {
					var point = new google.maps.LatLng(item.geometry.location.lat(), item.geometry.location.lng());
					self.showAddressByPoint(point,gmarker);
				}
			});
		});
		return;
	};

	this.showAddressByPoint = function (point,gmarker) {
		// var index = self.current;  vecchio modo
		var index = self.getIndexById(gmarker.id);
		if (index < 0 ) {
			alert('errore');
			return ;
		}
		
		
		
		
		
		
		
		var params = {
				map:self.gmap,
			    draggable:gmarker.draggable,
			    animation: google.maps.Animation.DROP,
			    position: point,
			    icon : gmarker.icon,
			    title: gmarker.title,
			    optimized : false
		};
		if (gmarker.icon)
			params.icon = gmarker.icon;
		if (gmarker.googlem === null) {
			var marker = null;
            if (self.markerLabel) {
                params.icon = " ";
                params.labelClass = gmarker.labelClass ? gmarker.labelClass : "";
                params.labelAnchor = gmarker.labelAnchor ? gmarker.labelAnchor : new google.maps.Point(25, 25);
                params.labelContent  = gmarker.labelContent;
                marker = new MarkerWithLabel(params);
            } else {
               marker =  new google.maps.Marker(params);
            }
			self.markers[index].googlem = marker;
		} else {
			self.markers[index].googlem.setPosition(point);
			self.markers[index].googlem.setMap(self.gmap);
		}
		self.markers[index].lat = point.lat();
		self.markers[index].lng = point.lng();
		if (gmarker.draggable) {
			var localg = self.markers[index];
			google.maps.event.addListener(localg.googlem, 'dragend', function() {
				var pos = localg.googlem.getPosition();
				localg.lat = pos.lat();
				localg.lng = pos.lng();
				self.updateArea(index);
				self.markerDragend(pos,localg);
			});
		}


		if (gmarker.click_callback) {
			google.maps.event.addListener(self.markers[index].googlem, 'click', function() {
				gmarker.click_callback();
			});
		} else {
			if (gmarker.txt != "") {
				var infowindow = new google.maps.InfoWindow({
					content: gmarker.txt,
					maxWidth:250
				});
				gmarker.infoWindow = infowindow;
				//var index = self.current;
				google.maps.event.addListener(self.markers[index].googlem, 'click', function() {


					if (self.infowindowprec) {
						self.infowindowprec.close(); //chiude la precedente infowindow
					}

					infowindow.open(self.gmap,self.markers[index].googlem); //apre la nuova infowindow
					self.infowindowprec = infowindow; //assegna l'attuale infowindow alla variabile globale
				});
			}
		}
		if (gmarker.mouseover_callback) {
			google.maps.event.addListener(self.markers[index].googlem, 'mouseover', function() {
				gmarker.mouseover_callback();
			});
		}
		if (gmarker.mouseout_callback) {
			google.maps.event.addListener(self.markers[index].googlem, 'mouseout', function() {
				gmarker.mouseout_callback();
			});
		}
		self.markerPositionUpdated(gmarker);
	};

	this.loadScript = function () {
		var self = this;
		var script = document.createElement("script");
		script.type = "text/javascript";
		var src = "http://maps.googleapis.com/maps/api/js?key=" + self.apiKey;
		if (self.version)
			src += "&v="+self.version;
		src += "&callback=" + self.objName + ".initialize&language="+self.language;
		script.src = src;
		document.body.appendChild(script);
		self.afterLoadScript();
		
	};


	this.addMarker = function (marker) {
		if (!marker.id) {
			marker.id = self.markers.length;
		}
		self.markers.push(marker);
		return self.markers.length;
	};

	/*
	 * fare overloading di questa funzione se si vuole settare opzioni particolari
	 */
	this.afterInitialize = function() {
		return ;
	};
	this.afterLoadScript = function () {
		return ;
	};

	this.deleteMarker = function (index) {
		if (self.markers[index]) {
			if (self.markers[index].googlem !== null) {
				google.maps.event.clearListeners(self.markers[index].googlem, 'click');
				self.markers[index].googlem.setMap(null);
			}
			self.markers.splice(index, 1);
			return true;
		}
		log.warn("indice non trovato " + index);
		return false;
	};

	this.hideMarker = function (index) {
		if (self.markers[index] && self.markers[index].googlem !== null) {
			self.markers[index].googlem.setMap(null);
		}
	};
	
	this.showMarker = function (index) {
		if (self.markers[index] && self.markers[index].googlem !== null) {
			var gm = self.markers[index].googlem;
			gm.setMap(self.gmap);
			gm.setTitle(self.markers[index].title);
			gm.setPosition( new google.maps.LatLng(self.markers[index].lat, self.markers[index].lng));
			if (self.markers[index].infoWindow) {
				self.markers[index].infoWindow.setContent(self.markers[index].txt);
			}
		}
	};
	
	this.deleteAllMarkers = function () {
		var self = this;
		for (var i=0;i<self.markers.length;i++) {
			google.maps.event.clearListeners(self.markers[i].googlem, 'click');
			self.markers[i].googlem.setMap(null);
		}
		self.current = 0;
		self.markers = [];
	};
	
	this.updateMarker = function (index,values) {
		//console.log(self.markers[index]);

		if (self.markers[index] && self.markers[index].googlem !== null) {
			if (values.address) {
				self.current = index;
				self.showAddress(values.address,self.markers[index]);
			} else {
				var m = self.markers[index].googlem;
				var newLatLng = new google.maps.LatLng(values.lat, values.lng);
				//if (values.lat)
				//	m.position.lat(values.lat);
				//if (values.lng)
				//	m.position.lng(values.lng);
				m.setPosition(newLatLng);
			}
		}
	};
	this.hidePath = function () {
		self.directionsDisplay.setMap(null);
	}
	this._showPath = function (sIndex, eIndex,middlePoints,travelMode, callback) {
		/*
	    google.maps.TravelMode.DRIVING (Default) indicates standard driving directions using the road network.
	    google.maps.TravelMode.BICYCLING requests bicycling directions via bicycle paths & preferred streets.
	    google.maps.TravelMode.TRANSIT requests directions via public transit routes.
	    google.maps.TravelMode.WALKING requests walking directions via pedestrian paths & sidewalks.
*/
		try {
			if (!travelMode)
				travelMode = google.maps.TravelMode.DRIVING;
			if (!self.directionsService) {
				self.directionsService = new google.maps.DirectionsService();
			}
			if (self.directionsPanelId)
				self.directionsDisplay.setPanel(document.getElementById(self.directionsPanelId));
			self.hidePath();
			var start = self.markers[sIndex].googlem.position;
			var end = self.markers[eIndex].googlem.position;
			var waypoints = [];
			for (var i in middlePoints) {
				waypoints.push({location:middlePoints[i],stopover:true});
			}
			var request = {
					origin:start,
					destination:end,
					travelMode:  travelMode,
					waypoints : waypoints
			};
			self.directionsService.route(request, function(response, status) {
				console.log("DIRECTIONSERVICE",response,status);
				switch(status) {
				case google.maps.DirectionsStatus.OK:
					self.directionsDisplay.setMap(self.gmap);
					self.directionsDisplay.setDirections(response);
					var legs_length = response.routes[0].legs.length;
					for (var i in response.routes[0].legs) {
						self.markers[i].route_address = response.routes[0].legs[i].start_address;
					}
					self.markers[legs_length].route_address = response.routes[0].legs[legs_length-1].end_address;
					break;
				default:
					$(self.directionsDisplay.getPanel()).html($.translate("percorso_non_trovato"));
					for (var i in self.markers)
						self.markers[i].route_address = null;
					/*
					 *     NOT_FOUND indicates at least one of the locations specified in the request's origin, destination, or waypoints could not be geocoded.
					    ZERO_RESULTS indicates no route could be found between the origin and destination.
					    MAX_WAYPOINTS_EXCEEDED indicates that too many DirectionsWaypoints were provided in the DirectionsRequest. The maximum allowed waypoints is 8, plus the origin, and destination. Google Maps API for Work customers are allowed 23 waypoints, plus the origin, and destination. Waypoints are not supported for transit directions.
					    INVALID_REQUEST indicates that the provided DirectionsRequest was invalid. The most common causes of this error code are requests that are missing either an origin or destination, or a transit request that includes waypoints.
					    OVER_QUERY_LIMIT indicates the webpage has sent too many requests within the allowed time period.
					    REQUEST_DENIED indicates the webpage is not allowed to use the directions service.
					    UNKNOWN_ERROR indicates a directions request could not be processed due to a server error. The request may succeed if you try again.


					 */
					break;
				}
				/*
				if (status == google.maps.DirectionsStatus.OK) {
					self.directionsDisplay.setMap(self.gmap);
					self.directionsDisplay.setDirections(response);
			    } else {
			    	self.directionsDisplay.setMap(null);
			    }
			    */
				callback({msg:'',error:0,response:response})
			});
		} catch(e) {
			log.error(e.message);
			callback({msg:e.message,error:1,response:[]})
		}
	};
	this.showPath = function (sIndex, eIndex,travelMode,callback) {
		self._showPath(sIndex, eIndex, [], travelMode, function (result) {
			if (callback)
				callback(result);
		});
	};
	
	this.showPaths = function (sIndex, eIndex,middlePoints,travelMode,callback) {
		self._showPath(sIndex, eIndex, middlePoints, travelMode, function (result) {
			if (callback)
				callback(result);
		});
	};

	this.showArea = function(data) {
		var self = this;
		self.hideArea();

        for (var i=0;i<self.markers.length;i++) {
        	console.log(self.markers[i]);
            var cityCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: self.gmap,
                center: { 'lat':self.markers[i].lat, 'lng': self.markers[i].lng},
                radius: data.raggio
            });
            self.areas.push(cityCircle);
        }
            // Add the circle for this city to the map.
	}

	this.hideArea = function() {
		var self = this;
        for (var i=0;i<self.areas.length;i++) {
			self.areas[i].setMap(null);
        }
        self.areas = [];
	}

	this.updateArea = function (index) {
		var self  =this;
        if (index < self.areas.length) {
            self.areas[index].setCenter({ 'lat':self.markers[index].lat, 'lng': self.markers[index].lng});
        }
    }
	this.getMarker = function (index) {
		if (index < self.markers.length) {
			return self.markers[index];
		}
		return null;
	};

	this.getIndexById = function (marker_id) {
		for (var i=0;i<self.markers.length;i++)
			if (self.markers[i].id == marker_id)
				return i;
		return -1;
	};

	this.getMarkerById = function (marker_id) {
		var index = self.getIndexById(marker_id);
		return self.getMarker(index);
	};

	this.markerToCenter = function (index) {
		if (index >= self.markers.length) {
			log.warn("index:"+index+" out of range, size:"+self.markers.length);
			return ;
		}
		// se il marker e' gia stato creato
		if (self.markers[index].googlem) {
			var point = self.markers[index].googlem.position;
			
		} else {
			var point = new google.maps.LatLng(self.markers[index].lat, self.markers[index].lng)

		}
		//console.log('point',point);
		self.gmap.setCenter(point);
	};

	this.setCenter = function (lat,lng) {
		var point = new google.maps.LatLng(lat, lng);
		self.gmap.setCenter(point);
	};

	this.setCenterToMarkers = function (zoom) {
		var bounds = new google.maps.LatLngBounds();
		var foundIt = false;
		for(var i=0;i<self.markers.length;i++) {
			if (self.markers[i].googlem === null) {
				log.warn("google pointer null with index:" + i);
				continue;
			}
			if (self.markers[i].googlem.getMap()) {
				bounds.extend(self.markers[i].googlem.getPosition());
				foundIt = true;
			}
		}
		if (!foundIt)
			return ;
		zoomChangeBoundsListener = 
	        google.maps.event.addListener(self.gmap, 'bounds_changed', function(event) {
	        	//console.log("bounds_changed",zoom,self.gmap.getZoom());
	        	if (zoom) {
	        		if (self.gmap.getZoom() > zoom) {
	        			//console.log("setZoom");
	        			self.gmap.setZoom(zoom);
	        		}
	        	}
	        	/*
	            if (this.getZoom() > 15 && this.initialZoom == true) {
	                // Change max/min zoom here
	                this.setZoom(15);
	                this.initialZoom = false;
	            }
	            */
	        	google.maps.event.removeListener(zoomChangeBoundsListener);
	        });
	        
		self.gmap.fitBounds(bounds);
	};

	this.loadMarkerWithLabelScript = function (callback) {
		var s = document.createElement('script');
	    s.src = self.markerLabelScript;
	    s.async = true;
	    s.onreadystatechange = s.onload = function() {
	    	console.log("LOAD SCRIPT",s.readyState);
	        var state = s.readyState;
	        callback();
	        /* boh
	        if (!callback.done && (!state || /loaded|complete/.test(state))) {
	            callback.done = true;
	            callback();
	        }
	        */
	    };
	    document.getElementsByTagName('head')[0].appendChild(s);
	};

	// ----- events  --- 
	this.zoom_changed = function() {
		// override this event
	};

	this.showMarkersEnd = function () {
		// override this event
	};

	this.markerDragend = function (position,marker) {
		// override this event
	};

	this.markerPositionUpdated = function (gmarker) {
		// override this event
	};
	
	this.bounds_changed = function (event) {
		// override this event
	};
}



/**
 * definizione protocollo tra json che arriva dal server e le strutture
 * dati interne alla libreria javascript
 * In caso di server con formato di dati diverso aggiungere un protocollo e definire
 * le trasformazioni in caso di record o di lista
 *
 */

var Protocol = Class.extend({
    value : null,
    metadata : {},
    resultParams : {},
    validationRules : {},
    backParams : {},
    summary : {},
    jsonToData : function (json) {
        throw "override jsonToData function ";
    }
})

var RecordProtocol = Protocol.extend({
    jsonToData : function (json) {
        this.value = json.result;
        this.metadata = json.metadata;
        this.resultParams = json.resultParams;
        this.validationRules = json.validationRules;
        this.backParams = json.backParams;
    }
});

var ListProtocol = Protocol.extend({
    pagination :{},
    has_errors : false,
    jsonToData : function (json) {
        this.value = json.result.data;
        this.metadata = json.metadata;
        this.pagination = _.omit(json.result, ['data','has_errors']);
        this.resultParams = json.resultParams;
        this.summary = json.summary;
        this.validationRules = json.validationRules;
        this.backParams = json.backParams;
        this.has_errors = (json.result.has_errors == true);
        this.list_header = json.data_header;
    }
});

/**
 * VERSIONE LIBRERIA 3
 */
var Routes = {
    'list' : {
        method      : $.get,
        url         : '/api/json/{model}',
        resultType  : 'list'
    },
    'listConstraint': {
        method      : $.get,
        url         : '/api/json/{model}/{constraintKey}/{constraintValue}',
        resultType  : 'list'
    },
    'edit' : {
        method      : $.get,
        url         :'/api/json/{model}/{pk}/edit',
        resultType  : 'record'
    },
    'editConstraint' : {
        method      : $.get,
        url         :'/api/json/{model}/{pk}/edit/{constraintKey}/{constraintValue}',
        resultType  : 'record'
    },
    'search' : {
        method      : $.get, 
        url         :'/api/json/{model}/search',
        resultType  : 'record'
    },
    'insert' : {
        method      : $.get,
        url         :'/api/json/{model}/create',
        resultType  : 'record'
    },
    'insertHasmany' : {
        method      : $.get,
        url         :'/api/json/{model}/create_has_many',
        resultType  : 'record'
    },
    'insertConstraint' : {
        method      : $.get,
        url         :'/api/json/{model}/create/{constraintKey}/{constraintValue}',
        resultType  : 'record'
    },
    'saveConstraint' : { 
        method      : $.post,
        url         : '/api/json/{model}/{pk}/{constraintKey}/{constraintValue}',
        resultType  : 'record'
    },
    'save'          : { 
        method      : $.post,
        url         : '/api/json/{model}/{pk}',
        resultType  : 'record'
    },
    'create'        : { 
        method      : $.post,
        url         : '/api/json/{model}/create',
        resultType  : 'record'
    },
    'createConstraint' : { 
        method      : $.post,
        url         : '/api/json/{model}/create/{constraintKey}/{constraintValue}',
        resultType  : 'record'
    },
    'view'          : {
        method      : $.get,
        url         : '/api/json/{model}/{pk}',
        resultType  : 'record'
    },

    'remove'        : {
        method      : $.post,
        url         : '/api/json/{model}/{pk}',
        resultType  : 'record'
    },
    'removeAll'     :  {
        method      : $.post,
        url         :  '/api/json/{model}/deleteall',
        resultType  : 'record'
    },

    'set' :           {
        method      : $.post,
        url         : '/api/json/set/{model}/{field}/{value}',
        resultType  : 'record'
    },
    'calendar' :    {
        method      : $.post,
        url         : '/api/json/{model}',
        resultType  : 'list'
    },
    'csv':          {
        method      : $.get,
        url         : '/api/json/csv/{model}',
        resultType  : 'record'
    },
    'addcsv':       {
        method      : $.post,
        url         : '/queue/add/csv/load',
        resultType  : 'record'
    },
    'savecsv':       {
        method      : $.post,
        url         : '/queue/add/csv/save',
        resultType  : 'record'
    },
    'statuscsv':    {
        method      : $.get,
        url         : '/queue/status/{jobId}',
        resultType  : 'record'
    },
    'datacsv':      {
        method      : $.get,
        url         : '/api/json/csv/{model}/{jobId}',
        resultType  : 'list'
    },
    'errorcsv':      {
        method      : $.get,
        url         : '/api/json/csverror/{model}/{jobId}',
        resultType  : 'list'
    },
    'csvrevalidate':      {
        method      : $.post,
        url         : '/api/json/csv/revalidate/{model}/{jobId}',
        resultType  : 'record'
    },
    'recuperacsv':      {
        method      : $.post,
        url         : '/api/json/csvrecovery/{model}',
        resultType  : 'record'
    },
    'csvrowupdate' : {
        method      : $.post,
        url         : '/api/json/csvrowupdate/{model}',
        resultType  : 'record'
    },
    'listing' : {
        method      : $.get,
        url         : '/api/json/listing/{model}',
        resultType  : 'list'
    },
    'queueStatus' : {
        method      : $.post,
        url         : '/queue/status/{jobId}',
        resultType  : 'record'
    },
    'addQueue' : {
        method      : $.get,
        url         : '/queue/add/{queue}',
        resultType  : 'record'
    }
};

Routes.getUrlInstance = function (type,params) {
    var baseU = Routes[type];
    if (!baseU)
        throw 'invalid url type ' + type;
    var finalUrl = baseU.url;
    for (var key in params) {
        var find = '\{'+key+'\}';
        var re = new RegExp(find, 'g');
        finalUrl = finalUrl.replace(re, params[key]);
    }
    return finalUrl;
};

/**
 * VERSIONE LIBRERIA 3
 */

var CoreView = Class.extend({
    modelName           : null, 
    renderObjs          : [],
    config              : {},
    data                : {},
    prefixTemplateClass : 'default',
    type                : null,
    jQe                 : null,
    langs               : [],
    //defaultRenderType   : null,
    defaultRenderClassName : null,
    connectedObjs       : {},
    routeType           : null,     // oggetto route da utilizzare per prendere i dati
    keyId               : null,     // identificativo univoco della view creata e assegnata dal controller
    _controller         : null,     // controller proprietario della view
    _customAttrs        : {},       // attributi per le view custom personalizzabili a seconda delle esigenze
    // mapping delle viste con i tipi default dei render
    viewTypeToRenderType : {
        'list'      : BaseElement.VIEW,
        'edit'      : BaseElement.EDIT,
        'search'    : BaseElement.SEARCH,
        'view'      : BaseElement.VIEW,
        'calendar'  : BaseElement.VIEW,
        'csv'       : BaseElement.EDIT
    },

    init: function (modelName,config,data) {
        this.modelName = modelName;
        this.renderObjs = {};
        this.connectedObjs = {};
        this.data = data?data:{};
        this.setConfig(config);
        this._customAttrs = {};
    },

    setConfig : function (config) {
        if (this.config)
            delete this.config;
        this.config = config?config:{};
        this.langs = this.config.langs?this.config.langs:['it'];
        this.prefixTemplateClass = this.config.prefixTemplateClass?this.config.prefixTemplateClass:'default';
        if (config && config.afterLoadData)
            this.afterLoadData = config.afterLoadData;
        if (config && config.afterRender)
            this.afterRender = config.afterRender;
    },
    setController : function (controller) {
        this._controller = controller;
    },
    // renderizza rotellina nell'area dedicata alla view
    renderWait : function () {
        var self = this;
        log.warn("renderWait obsoleta con introduzione di templatecustom");
        return ;
        if ($(self.config.container).length !== 0) {
            $(self.config.container).html($('#default_big_spinner_tpl').html());
        }
    },
    /**
    * render della view
    **/
    render : function () {
        var self = this;
        if (self.config.custom) {
            self.jQe = $(self.config.container);
            if (self.config.customTemplate) {
                $(self.config.container).html($(self.config.customTemplate).html())
            }
            console.log("custom " + self.config.custom);
            var customName = Utility.pascalCase(self.config.custom);
            var configFunction = '_configViewCustom'+customName;
            var renderFunction = '_renderViewCustom'+customName;

            if (!_.isFunction(self[renderFunction])) {
                throw 'View'+ self.type + '.'+ renderFunction + ' not implemented';
            }

            if (_.isFunction(self[configFunction])) {
                self[configFunction](self.config.container);
            }
            self._setKeys();
            self[renderFunction](self.config.container);
            //self._renderCustom($(self.config.container));
            $.translateDocument(self.config.container);
            self._finalize();
            return $(self.config.container).html();
        }
        log.debug("CoreView.render",self.keyId,self.type,self.config.contaner);
        var obj = self._getTemplate();
        // aggiungo un attributo di riconoscimento al template della view
        if (obj.children().length > 0) {
            $(obj.children()[0]).attr('data-view_model',self.modelName);
            $(obj.children()[0]).addClass(self.modelName);
        }
        if (!_.isFunction(self.render))
             throw 'View'+ self.type + '._render not implemented';
        // rendo univoci gli id di eventuali tab
        $.each($(obj).find('[role="tablist"]').find('a'),function () {
            var href = $(this).attr('href').substr(1);
            $(this).attr('href','#'+self.keyId+href);
            $(this).html($.translate(self.config.groups[href].title));
        });
        // creo gli id dei gruppi per le view raggruppate
        $.each($(obj).find('[data-group]'),function () {
            $(this).attr('id',self.keyId+ $(this).attr('data-group')); //$(this).attr('id'));
        });

        $(self.config.container).html('');
        $(self.config.container).html(obj.html());
        obj.remove();
        //delete obj;
        self.jQe = $(self.config.container);
        self._render();
        // disabilito il submit automatico  della form in caso di return
        $(self.config.container).find('input').on('keypress', function(e) {
            return e.which != 13;
        });
        self._finalize();
        $.translateDocument(self.config.container);
        return $(self.config.container).html();
    },
    setData : function (data) {
        this.data = data;
    },

    // getFormData : function () {
    //     var self = this;
    //     var form = $(self.config.container).find('form[name="data_form"]');
    //     if (form.length === 0)
    //         return {};
    //     if (typeof tinyMCE !== 'undefined') {
    //         tinyMCE.triggerSave();
    //     }
    //     return form.serializeAssoc();
    // },

    getFormData : function () {
        var self = this;
        var form = $(self.config.container).find('form[name="data_form"]');
        if (form.length === 0)
            return {};
        if (typeof tinyMCE !== 'undefined') {
            tinyMCE.triggerSave();
        }
        var formData =  form.serializeAssoc();
        var postData = {}
        // trasformo tutti gli [d] in [] questa modifica e' fatta per gestire i radio button negli hasmany
        // altrimenti venivano raggruppati come un unica entita'
        for( var k in formData) {
            if (formData[k].constructor !== Array) {
                postData[k] = formData[k];
                continue;
            }
            var pattern = /(.+)(\[\d+\])(.*)$/g;
            var match = pattern.exec(k);
            if (match && match.length == 4) {
                var newkey = match[1] + '[]' + match[3];
                if (!postData[newkey])
                    postData[newkey] = [];
                postData[newkey].push(formData[k]);
                delete formData[k];
            }  else {
                postData[k] = formData[k];
            }
        }
        return postData;
    },

    getModelData : function () {
        var self = this;
        throw 'CoreView.getModelData is abastract. viewType is ' + self.type;
    },



    _getTemplate : function () {
        var self = this;
        var tplId = self.config.templateId;
        if (!tplId) {

            if (self.config.groups) {
                var groupLength = _.keys(self.config.groups).length;
                self.config.templateId = '#'+ self.prefixTemplateClass +'_view_'+self.type+'_group' + groupLength + '_tpl';
                tplId = self.config.templateId;
            } else {
                tplId = '#' + self.prefixTemplateClass + '_view_' + self.type + '_tpl';
                if ($(tplId).length === 0)
                    throw 'View: Template source ' + tplId + ' Not found';
            }
        }

        return $.createDynamicContainer(tplId);
    },
    /**
     * ritorna il nome della classe in base al tipo di render
     */
    getRenderClass : function (type) {
        return "Render" + Utility.pascalCase(type);
    },
    /**
     * crea un nuovo oggetto action a partire da quello passato. ogni azione nella view
     * deve essere un nuovo oggetto rispetto a quello che c'e' nella configurazione
     * @param {string} actionName
     * @param {object} params
     * @private {object} nuova copia dell'azione
     */
    _buildSingleAction : function (actionName,params) {
        var action = null;
        // TODO controllare se ci sia bisogno davvero di fare un nuovo oggetto
        if (params instanceof CollectionAction)
            action = new CollectionAction();
        else
            action = new RecordAction();
        action.action = actionName;
        for(var f in params)
            action[f] = params[f];
        //action.func = params.func;             
        return action;
    },

    _buildFunctionParams : function () {
        throw this.type + " ._buildFunctionParams not implemented";
    },
    /**
     * esegue la valutazione della prop di un oggetto action che puo' essere
     * un valore semplice o una funziona
     * @param prop: property della action da analizzare
     **/
    _evaluateFunctionProp : function () {
        throw this.type + " ._evaluateFunctionProp not implemented";
    },
    getRenderObj : function(key) {
        throw this.type + " .getRenderObj not implemented";
    },


    // --- abstract metod
     /**
     * metodo da overloadare che verra' richiamato in seguito dall'oggetto CoreView.
     * @param jQe : elemento jquery contenente il template sorgente
     */
    _render : function (jQe) {
        throw '_render Not implemented';
    },

    _renderViewCustomBase : function (jQe) {
        throw '_renderViewCustomBase Not implemented';
    },
    _renderViewCustomComplex : function (jQe) {
        throw '_renderViewCustomComplex Not implemented';
    },
    /**
     * metodo opzionale verra' chiamato quando l'html e' stato tutto renderizzato
     */
    _finalize : function () {
        //throw '_finalize Not implemented';
    },

    _finalizeCustom : function () {

    },
    /*
    *   restituisce la modalita' in cui verra' disegnato l'oggetto render
    * in base alla configurazione dell'oggetto nell control_type della view
    */
    _getRenderMode : function (key) {
        var self = this;
        // il mode dell'oggetto render di default in base al tipo di view
        var mode = self.viewTypeToRenderType[self.type];
        if (self.config.fields_type[key] && self.config.fields_type[key].mode)
            mode = self.config.fields_type[key].mode;
        return mode;
    },
    /**
     * ritorna il type del render in base al type definito nella fields_type della view
     * @params key : chiave dell'oggetto render
     *
     **/
    _getRenderType : function (key) {
        var self = this;
        var type = (self.config.fields_type[key] && self.config.fields_type[key].type)?self.config.fields_type[key].type:self.defaultRenderType;
        return type;
    },
    /*
    _getRenderClassName : function (key) {
        var self = this;
        var type = (self.config.fields_type[key] && self.config.fields_type[key].className)?self.config.fields_type[key].className:self.defaultRenderClassName;
        return type;
    },
    */
    /**
     * ritorna la configurazione di default dell'oggetto render
     * @params key : chiave dell'oggetto render
     **/
    _getDefaultRenderConfig : function(key) {
        var self = this;
        // preparo la configurazione minima di default
        var rconfig = {
            mode : self._getRenderMode(key),
            modelName : self.modelName,
            langs : self.langs
        };
        // aggiungo operatore in caso di search
        if (self.config.operator && self.config.operator[key])
            rconfig['operator'] = self.config.operator[key];
        return rconfig;
    },
    /**
     * prepara i campi di configurazione per l'oggetto render
     * @params key : chiave dell'oggetto render
     **/
    _getRenderConfig : function(key,realType) {
        var self = this;
        var rconfig = self._getDefaultRenderConfig(key);
        if (!self.config.fields_type[key])
            return rconfig;

        // passo le configurazione del type nella view alla configurazione del render
        for (var i in self.config.fields_type[key]) {
            rconfig[i] = self.config.fields_type[key][i];
        }

        var type = self._getRenderType(key);
        var classConfig = Render.getClassData(type);

        var funcName = "_get" + classConfig + "Config";
        if (_.isFunction(self[funcName])) {
            return self[funcName](key,rconfig);
        }
        return rconfig;

        /*

        var type = self._getRenderType(key);
        if (realType)
            type = realType;
        var funcName = "_get" + self.getRenderClass(type) + "Config";
    
        if (_.isFunction(self[funcName])) {
            return self[funcName](key,rconfig);
        }

        // configurazioni speciali compatibilita' all'indietro
        switch(self.config.fields_type[key].type) {
            case 'radio':
                rconfig.choiceType = 'radio';
                break;
            //case 'checkbox':
            //    rconfig.choiceType = 'select';
            case 'attachment':
            case 'foto':
                rconfig.uploadType = self.config.fields_type[key].type;
                break;
            case 'map':

                break;
            case 'switchlink':
                //rconfig.type = 'swap';

        }

        return rconfig;
        */

    },
    // configurazioni speciali 
    _getRenderHasmanyConfig : function (key,rconfig) {
        var self = this;
        rconfig.metadata = self.data.metadata[key];
        rconfig.modelConf = self.config.fields_type[key].modelConf;
        return rconfig;
    },
    _getRenderHasmanyThroughConfig : function (key,rconfig) {
        var self = this;
        if (!rconfig.autocompleteModel)
            rconfig.autocompleteModel = Utility.snakeCase(self.data.resultParams[key].modelRelativeName);
        //rconfig.modelConf = self.config.fields_type[key].modelConf;
        return rconfig;
    },

    _getRenderAutocompleteConfig : function (key,rconfig) {
        var self = this;
        if (!rconfig.autocompleteModel)
            rconfig.autocompleteModel = Utility.snakeCase(self.data.resultParams[key].modelRelativeName);
        //rconfig.modelConf = self.config.fields_type[key].modelConf;
        return rconfig;
    },
    _getRenderMapConfig : function (key,rconfig) {
        var self = this;
        var indirizzo = "";
        if (self.config.fields_type[key].address_map) {
            for (var f in self.config.fields_type[key].address_map) {
                if (self.data.value[  self.config.fields_type[key].address_map[f]  ])
                    indirizzo += self.data.value[  self.config.fields_type[key].address_map[f]  ] + " ";
            }
        }
        rconfig.address = indirizzo;
        //rconfig.modelConf = self.config.fields_type[key].modelConf;
        return rconfig;
    },
    _getRenderVideoConfig : function(key,rconfig) {
        var self = this;
        rconfig.provider = self.data.resultParams['videos'].fields.provider.options;
        return rconfig;
    },
    /*
    _getRenderHasmanyConfig : function (key,rconfig) {
        var self = this;
        rconfig.metadata = self.data.metadata[key];
        rconfig.modelConf = self.config.fields_type[key].modelConf;
    },
    _getRenderHasmanyConfig : function (key,rconfig) {
        var self = this;
        rconfig.metadata = self.data.metadata[key];
        rconfig.modelConf = self.config.fields_type[key].modelConf;
    },
    */


    // da overloadare
    _attachEvents : function () {
        return ;
    },

    
    _attachEvent : function (render,pk) {
        var self = this;
        render.fireEvent = function (evt) {
            evt.pk = pk;
            self.fireToConnected(evt);
            self.fireEvent(evt);
        };
    },
    fireEvent : function (evt) {
        var self = this;
        log.warn('CoreView.fireEvent ' + evt.eventName  + '  view ' + evt.type + ' not overladed');
        return ;
    },
    fireToConnected : function (evt) {
        throw ' fireToConnected not implemented';
    },
    /**
     * restituisce l'oggetto data da assegnare all'oggetto render
     */
    _getRenderData : function (key) {
        throw ' _getRenderData not implemented';
    },

    _setKeys : function () {
        throw ' _setKeys not implemented';
    },

    // eventi di default chiamati dal sistema
    afterLoadData : function () {
        log.debug(this.keyId,this.modelName,this.type,'default afterLoadData');
    },
    afterRender : function () {
        log.debug(this.keyId,this.modelName,this.type,'default afterRender');
    }
});

/**
 * VERSIONE LIBRERIA 3
 */

var ViewCollection = CoreView.extend({
    /**
     * inizializza le keys della view che rappresenta tutti i fields da renderizzare
     * @private
     */
    _setKeys : function () {
        var self = this;
        self.keys = self.config.fields; //Object.keys(self.config.fields);
        if (self.keys.length === 0) {
            if (self.data.value.length > 0 )
                self.keys = Object.keys(self.data.value[0]);
        }
    },
    /**
     * renderizza gli header delle colonne dati
     **/
    _renderHeaderValues : function (jQrow) {
        var self = this;

        var objH = $.createDynamicContainer('#'+self.prefixTemplateClass+'_view_list_header_tpl');
        var objO = $.createDynamicContainer('#'+self.prefixTemplateClass+'_view_list_order_tpl');
        var orderFields = self.config.order_fields?Object.keys(self.config.order_fields):[];
        // renderizzo i nomi
        //console.log('ACTION LAYOUT',self.config.actions_layout);
        $.each(jQrow.children('th'),function (index,th) {
            // se le azioni vengono renderizzate a sinistra devo saltare un indice
            if (self.config.actions_layout == 'left' && index === 0) {
                // la prima colonna la salto ;
            } else if (self.config.actions_layout == 'right' && index == self.visibleKeys.length) {
                // salto l'ultima colonna in caso di right
            } else {
                var i = (self.config.actions_layout == 'right')?index:index-1;
                var translateDef = $.translate(Utility.camelCase(self.modelName) + '-' + self.visibleKeys[i]);
                //console.log("check in array ",self.visibleKeys[i],$.inArray(self.visibleKeys[i],orderFields))
                if ($.inArray(self.visibleKeys[i],orderFields) >=0 ) {
                    objO.find('[data-pk]').attr('data-pk',self.visibleKeys[i]);
                    objO.find('[data-element]').html(translateDef);
                    $(th).html(objO.html());
                    if (self.data.resultParams.order_field == self.visibleKeys[i]) {
                        $(th).addClass('sorting_' + self.data.resultParams.order_direction.toLowerCase());
                        
                    } else
                        $(th).addClass('sorting');
                } else {
                    objH.find('[data-element]').html(translateDef);
                    $(th).html(objH.html());
                }
                $(th).addClass('field-'+self.visibleKeys[i]);
            }
        });
        objO.remove();
        objH.remove();
    },
    /**
     * renderizza gli header della colonna action
     **/
    _renderHeaderActions : function (jQrow) {
        var self = this;
        var colAction = (self.config.actions_layout != 'right')?0:self.visibleKeys.length;

        var azioniH = $.createDynamicContainer('#' + self.prefixTemplateClass + '_azioni_header_tpl');
        $(jQrow.children()[colAction]).html(azioniH.html());
        $(jQrow.children()[colAction]).attr('data-col_actions','');
        // in caso non ci sia niente da renderizzare, rimuovo la colonna
        if (! self._hasNeedSelectionAction() && ! self._hasRecordActions()) {
            $(jQrow.children()[colAction]).remove();
        } else {
            if (! self._hasNeedSelectionAction()) {
                $(jQrow.children()[colAction]).find('[data-button="checkAll"]').remove();
            } else {
                // aggiungo il check/uncheck delle righe
                $(jQrow.children()[colAction]).find('[data-button="checkAll"]').change(function () {
                    var check = $(this).prop('checked');
                    $(self.config.container).find('input[name="check_row"]').prop('checked',check);
                });
            }
        }
        azioniH.remove();
    },
    _renderHeader : function () {

        var self = this;
        var jQe = self.jQe;
        var row = jQe.find('[data-view_row_headers]');
        var col = row.find('th');

        // creo le colonne, da uno perche' c'e' gia' nel template
        for (var i=0;i<self.visibleKeys.length;i++) {
            col.clone().appendTo(row);
        }

        self._renderHeaderValues(row);
        self._renderHeaderActions(row);
    },

    _renderFooter : function () {
        var self = this;
        var jQe = self.jQe;

        if (!self.data.summary || Object.keys(self.data.summary).length == 0) {
            jQe.find('tfoot').remove();
            return ;
        }

        var row = jQe.find('[data-view_row_footer]');
        var col = row.find('td');

        // creo le colonne, da uno perche' c'e' gia' nel template
        for (var i=0;i<self.visibleKeys.length;i++) {
            col.clone().appendTo(row);
        }
        var summaryTplId = '#' + self.prefixTemplateClass +  "_view_summary_field_tpl";
        $.each(row.children('td'),function (index,td) {
            if (self.config.actions_layout == 'left' && index === 0) {
                // la prima colonna la salto ;
            } else if (self.config.actions_layout == 'right' && index == self.visibleKeys.length) {
                // salto l'ultima colonna in caso di right
            } else {
                //var i = (self.config.actions_layout == 'right')?index:index-1;
                // se i layout e' right oppure e' stata rimossa la colonna a sinistra perche' non ci sono azioni
                // l'indice dei dati corrisponde all'indice delle colonne, altrimenti devo togliere 1
                var i = ((self.config.actions_layout == 'right') ||
                    (! self._hasNeedSelectionAction() && ! self._hasRecordActions())) ? index:index-1;
                var field = self.visibleKeys[i];
                console.log('check',field);
                if (self.data.summary[field]) {
                    for (var operationKey in self.config.summary_fields[field]) {
                        var operation = self.config.summary_fields[field][operationKey];
                        var value = parseFloat(self.data.summary[field][operationKey]);
                        if (!isNaN(operation.decimal)) {
                            value = value.toFixed(operation.decimal);
                        }
                        var html = $.getTemplate(summaryTplId,{
                            operation : $.translate('general-summary_'+operationKey),
                            value : value + (operation.symbol ? ' ' + operation.symbol : ''),
                        })
                        console.log('salvo html',summaryTplId,html);
                        $(td).append(html);
                    }
                }
            }
        })

    },

    _attachEvents : function (index) {
        var self = this;
        for (var key in self.renderObjs[index]) {
            var render = self.renderObjs[index][key];
            var pk = self.data.value[index].id;
            self._attachEvent(render,pk);
        }


    },

    _attachDetailEvents : function () {
        // aggangio eventi detail
        var self = this;
        $(self.config.container).find('[data-detail_button]').unbind('click');
        $(self.config.container).find('[data-detail_button]').click(function () {
            var key = $(this).attr('data-key');
            var rowdata_index = parseInt($(this).attr('data-rowdata_index'));
            var isopen = parseInt($(this).attr('data-isopen'));
            //console.log('detail button',key,rowdata_index,isopen);
            var tr = $(this).closest('tr');
            var detail_row_key = key + "_" + rowdata_index;

            if (isopen) {
                console.log('isopen rimuovo',key,rowdata_index);
                var rowContainer = $(tr).closest('tbody').find('[data-detail_row="' + detail_row_key + '"]');
                //tr.eq(tr.index()+1).remove();
                //tr.next().remove();
                rowContainer.remove();
                //self.config.detail_fields[key].rowContainer=null;
                $(this).attr('data-isopen',0);
                return ;
            }

            $(this).attr('data-isopen',1);

            var modelData = self.data.value[rowdata_index];

            var tplData = {'detail_row_key':detail_row_key,'colspan':(self.visibleKeys.length+1)};

            var rowTemplate = $.getTemplate('#default_view_detail_field_tpl',tplData);



            tr.after(rowTemplate);
            // tr.after('<tr data-detail_row="' + detail_row_key + '" >' +
            //     '<td colspan="'+ (self.visibleKeys.length+1) + '"></td>' +
            //     '</tr>');
            var rowContainer = $(tr).closest('tbody').find('[data-detail_row="' + detail_row_key + '"]');
            $(rowContainer).find('[data-detail_title]').html($.translate(Utility.camelCase(self.modelName)+'-'+key));
            console.log('NON open visualizzo',detail_row_key,rowContainer);
            var detailContainer = rowContainer.find('[data-detail_container]');
            var func = self.config.detail_fields[key].func;
            //self.config.detail_fields[key].rowContainer = rowContainer;
            //console.log(detailContainer,modelData);
            func(detailContainer,modelData);
            return ;
        });
    },
    _buildFunctionParams : function (index,func) {
        var self = this;
        var params = {};
        var args = func.toString ().match (/function\s*\w*\s*\((.*?)\)/)[1].split (/\s*,\s*/);
        for (var a in args)
            params[args[a] ] = self.data.value[index][ args[a] ];
        return  _.values(params);
    },
    _evaluateFunctionProp : function (index,prop) {
        var self = this;
        if ( ! (index === null) && _.isFunction(prop)) {
            var fValues = self._buildFunctionParams(index,prop);
            return prop.apply(null, fValues);
        }
        return prop;
    },
    fireToConnected : function (evt) {
        var self = this;
        return ;
        /* TODO da vedere
         if (self.connectedObjs[evt.key]) {
         for (var i in self.connectedObjs[evt.key]) {
         var destKey = self.connectedObjs[evt.key][i];
         var func = self.renderObjs[0][destKey].config.dependencies.action;
         var container = $(self.config.container).find(self.renderObjs[0][destKey].config.container);
         func.apply(self,[evt,container]);

         }
         }
         */
    },
    /**
     * ritorna tutte le pk delle rows selezionate.
     **/
    getChecked : function () {
        var self = this;
        var selected = [];
        $.each($(self.config.container).find('input[name="check_row"]:checked'),function () {
            selected.push($(this).attr('data-pk'));
        });
        return selected;
    },
    /**
     * restituisce l'oggetto data da assegnare all'oggetto render
     */
    _getRenderData : function (key,index,realType) {
        var self = this;
        var type = self._getRenderType(key);
        //if (realType)
        //    type = realType;
        // controllo che non ci sia definita una funzione speciale per i dati dell'oggetto render
        var funcName = '_get' + Render.getClassData(type) + 'Data';
        //log.debug(key + " check " + funcName);
        if (_.isFunction(self[funcName])) {
            return self[funcName](key,index);
        }
        var rdata = {
            value : self.data.value[index][key]
        };
        return rdata;
    },
    /**
     * funzione specifica per prendere i dati di un RenderCustom
     * @param key
     * @param index
     * @returns {{value: *, modelData: *}}
     * @private
     */
    _getRenderCustomData : function (key,index) {
        var self = this;
        var rdata =  {
            value : self.data.value[index][key],
            modelData : self.data.value[index]
        };
        return rdata;
    },
    _renderGlobalActions : function (actionConf) {
        var self = this;
        var actionsValues = [];
        for (var a in actionConf.actionData) {
            if (actionConf.actionData[a] instanceof RecordAction)
                continue
            var actionData = actionConf.actionData;
            var tmpValues = self._getTemplateActionData(null,actionData[a]);
            actionsValues.push(tmpValues);
        }
        var actHtml = $.getTemplate('#'+ self.prefixTemplateClass + '_view_global_action_tpl',{data:actionsValues});
        $(self.jQe).find('[data-view_row_actions]').html(actHtml);
    },

    _renderInfoHeader : function() {
        var self = this;
        $(self.jQe).find('[data-list_header]').html(self.data.list_header);
    },

    _render : function () {
        var self = this;
        if (self.visibleKeys.length)
            delete self.visibleKeys;
        self.visibleKeys = [];

        self._renderInfoHeader();

        if (self.data.value.length === 0) {
            self._renderZeroResult();
        } else {
            self._setKeys();
            self._setVisibleKeys();
            self._renderListHeader();
            self._renderPagination();
            self._renderHeader();
            self._renderFooter();
            self._createGrid();
            for (var i in self.data.value) {
                self._renderRow(i);
            }
            for (var i in self.data.value) {
                self._finalizeRow(i);
            }
            for (var i in self.data.value) {
                self._attachEvents(i);
            }
            self._attachDetailEvents();

        }

        self._renderActions();
    },

    _configViewCustomBase : function () {
        var self = this;
        // solo la prima volta mi prendo i riferimenti ai template
        var container = $.createDynamicContainer(self.config.container);;
        if (Object.keys(self._customAttrs) == 0) {
            //self._customAttrs.container = $(self.config.container);
            self._customAttrs.sourceContainer =  '#' + container.attr('id');
            //self._customAttrs.actionTpl = '#default_view_single_action_item_tpl';
            //self._customAttrs.actionGlobalTpl = '#default_view_global_action_tpl';
        }
    },
    _renderViewCustomBase : function () {
        var self = this;
        var tplData =  {
            items : self.data.value,
            pagination : self.data.pagination
        }
        $.renderTemplate($(self._customAttrs.sourceContainer),self.config.container,tplData);

    },
    /**
     * configurazione della view custom.
     * @private
     */
    _configViewCustomComplex : function () {
        var self = this;
        // solo la prima volta mi prendo i riferimenti ai template
        if (Object.keys(self._customAttrs) == 0) {
            self._customAttrs.container = $(self.config.container).find('[data-field="items"]');
            self._customAttrs.sourceHtml = $.getDomTemplate(self._customAttrs.container).html();
            self._customAttrs.actionTpl = '#default_view_single_action_item_tpl';
            self._customAttrs.actionGlobalTpl = '#default_view_global_action_tpl';
        }
    },
    /**
     * renderizza una viewList di tipo custom complex. Sono le view con gli oggetti render
     * descritti da tag e le configurazioni descritte nel model conf.
     * @private
     */
    _renderViewCustomComplex : function () {
        var self = this;

        $(self._customAttrs.container).html("");
        // cerco le global Action
        var configAction = self._getActionsConfig();
        var _findAction = function (name) {
            for (var i in configAction.actionData) {
                if (configAction.actionData[i].action == name)
                    return configAction.actionData[i];
            }
            return null;
        }

        $.each($(self.config.container).find('action'), function () {
            var name = $(this).attr('name');
            var actionData = _findAction(name);
            if (!actionData) {
                throw "action not found " + name;
            }
            var tplData = self._getTemplateActionData(0,actionData);
            var html = $.getTemplate(self._customAttrs.actionGlobalTpl, tplData);
            $(this).html(html);

        });

        // creo gli oggetti render
        for (var k in self.data.value) {
            $(self._customAttrs.container).append(self._customAttrs.sourceHtml);
            $.each($($(self._customAttrs.container).children()[k]).find('render'), function() {
                self._createRender(k,$(this).attr('data-field'),$(this));
            });
        }
        // chiamo la funzione render per ogni oggetto
        for (var i in self.renderObjs) {
            for (var k in self.renderObjs[i]) {
                self.renderObjs[i][k].render();
            }
        }
        // chiamo la funzione finalize per ogni oggetto
        for (var i in self.renderObjs) {
            for (var k in self.renderObjs[i]) {
                self.renderObjs[i][k].finalize();
            }
        }

        for (var i in self.data.value) {
            self._attachEvents(i);
        }

        self._renderPagination();
        // renderizzo evenutali azioni singole per record
        for (var k in self.data.value) {
            var itemContainer = $($(self._customAttrs.container).children()[k]);
            $.each($(itemContainer).find('action'), function () {
                //self._createRender(k, $(this).attr('data-field'), $(this));

                var name = $(this).attr('name');
                var actionData = _findAction(name);

                if (!actionData) {
                    throw "action not found " + name;
                }
                var tplData = self._getTemplateActionData(k,actionData);
                var html = $.getTemplate(self._customAttrs.actionTpl, tplData);
                $(this).html(html);

            });
        }
    },
    _setVisibleKeys : function () {
        var self = this;
        // calcolo le colonne visibili
        for (var i in self.keys) {
            if (self.config.fields_type[ self.keys[i] ] && self.config.fields_type[ self.keys[i] ].inputType == 'hidden')
                continue;
            self.visibleKeys.push(self.keys[i]);
        }
    },

    _renderZeroResult : function () {
        var self = this;
        var row = self.jQe.find('[data-view_row_elements]');
        row.find('td').html($.translate('Nessun elemento trovato'));
    },
    _renderPagination : function () {
        var self = this;
        if (!self.config.pagination) {
            self.jQe.find('[data-view_pagination]').remove();
            return ;
        }
        //console.log(self.data.pagination);
        var dy = $.createDynamicContainer('#default_view_list_pagination_tpl');
        $.renderTemplate(dy,dy,self.data.pagination);
        //console.log(dy.html());
        self.jQe.find('[data-view_pagination]').html(dy.html());
        dy.remove();

    },
    _renderListHeader : function () {
        var self = this;
        //console.log(self.data.pagination);
        // var dy = $.createDynamicContainer('#default_view_list_pagination_tpl');
        // $.renderTemplate(dy,dy,self.data.pagination);
        // self.jQe.find('[data-list_header]').html(dy.html());
        //console.log(dy.html());
        // dy.remove();
        var html = self.data.list_header;
        self.jQe.find('[data-list_header]').html(html);


    },

    _createRender : function (r,key,container) {
        var self = this;
        //log.debug('ViewCollection._createRender',r,key,container);
        var type = self._getRenderType(key);
        var classData = Render.getClassData(type);

        var rdata = self._getRenderData(key,r,classData);
        var rconfig = self._getRenderConfig(key,classData);
        rconfig.container = container;

        var render = Render.factory(key, _.extend(rconfig,rdata),type);

        if (!self.renderObjs[r])
            self.renderObjs[r] = {};

        self.renderObjs[r][key] = render;
        return render;


/*

        var type = self._getRenderType(key);
        var renderClass = Render.objType(type);
        var classData = Render.classData(type);

        var rdata = self._getRenderData(key,r,classData); //self._getRenderData(key,r,renderClass);
        var rconfig = self._getRenderConfig(key,renderClass);
        rconfig.container = container;
        var render = Render.factory(key, _.extend(rconfig,rdata),type);

        if (!self.renderObjs[r])
            self.renderObjs[r] = {};

        self.renderObjs[r][key] = render;
        return render;
        */
    },

    /**
     * renderizzo la riga con indice index
     * @param index
     * @private
     */
    _renderRow : function (index) {
        var self = this;
        var jQe = self.jQe;
        var rowContainer = jQe.find('[data-view_row_elements]').get(index);
        for (var i in self.keys) {
            var key = self.keys[i];
            var colIndex = $.inArray(key,self.visibleKeys);
            var container = null;
            if (colIndex >= 0) {
                if (self.config.actions_layout != 'right')
                    colIndex++;
                container = $( $(rowContainer).find('td').get(colIndex));
                container.addClass('field-'+key);
                // check se il campo e' associato un detail devo creare il template per il bottone detail
                if (self.config.detail_fields[key]) {
                    container.html($.getTemplate('#default_view_list_detail_tpl'));
                    container.find('[data-rowdata_index]').attr('data-rowdata_index',index);
                    container.find('[data-key]').attr('data-key',key);
                    container = container.find('[data-detail_container]');
                }
            }
            var r = self._createRender(index,key,container);
            r.render();
        }
        // assegno attributo alla colonna azioni
        var colAction = self.config.actions_layout != 'right'?0:self.visibleKeys.length;
        $( $(rowContainer).find('td').get(colAction)).attr('data-col_actions','');
    },
    /**
     * chiamo il finalize per ogni oggetto della riga
     * @param index
     * @private
     */
    _finalizeRow : function (index) {
        var self = this;
        var jQe = self.jQe;
        for (var i in self.keys) {
            self.renderObjs[index][self.keys[i]].finalize();
        }

    },
    _createGrid : function () {
        var self = this;
        var numRow = self.data.value.length;
        var numCol = self.visibleKeys.length;
        var jQe = self.jQe;
        var row = jQe.find('[data-view_row_elements]');
        var col = row.find('td');
        // clone le colonne
        for (var i=0;i<numCol;i++) {
            col.clone().appendTo(row);
        }
        row = jQe.find('tbody tr').first();
        //ora clono la prima riga
        for (var i=1;i<numRow;i++) {
            row.clone().prependTo( jQe.find('tbody') );
        }
    },

    _renderActions : function () {
        var self = this;
        if (self.config.actions.length === 0) {
            $(self.jQe).find('[data-col_actions]').remove();
            $(self.jQe).find('[data-view_row_actions]').remove();
            return ;
        }
        var actionConf = self._getActionsConfig();
        self._renderSingleActions(actionConf);
        self._renderGlobalActions(actionConf);
    },
    /**
     * prende i dati per la renderizzazione del template action.
     * @param row: indice di riga
     * @param actionObject : oggetto azione
     * @returns {*} ritorna un array associativo per il template da renderizzare
     * @private
     */
    _getTemplateActionData :  function (row,actionObject) {
        var self = this;
        var tplData = null;
        if (actionObject instanceof RecordAction) {
            tplData = new RecordAction(actionObject);
        } else {
            tplData = new CollectionAction(actionObject);
        }

        tplData.pk = (row===null)?null:self.data.value[row].id;
        tplData.actionText = self._evaluateFunctionProp(row,actionObject.actionText);
        tplData.actionIcon = self._evaluateFunctionProp(row,actionObject.actionIcon);
        tplData.actionTitle = self._evaluateFunctionProp(row,actionObject.actionTitle);
        tplData.actionClass = self._evaluateFunctionProp(row,actionObject.actionClass);
        tplData.visible = self._evaluateFunctionProp(row,actionObject.visible);
        tplData.enabled = self._evaluateFunctionProp(row,actionObject.enabled);
        tplData.target = self._evaluateFunctionProp(row,actionObject.target);
        tplData.href = null;
        tplData.params = (row===null)?[]:self._buildFunctionParams(row,actionObject.func);
        if (tplData.control_type == 'link') {
            actionObject.view = self;
            tplData.href = actionObject.func.apply(actionObject, tplData.params);
            tplData.target = self._evaluateFunctionProp(row,actionObject.target);
        }
        tplData.params = JSON.stringify(tplData.params);
        return tplData;
    },

    _getActionsConfig : function () {
        var self = this;
        var actionData =  [];
        var needSelection = false;
        // recupero le azioni singole presenti e controllo se sono di default o custom
        for (var i in self.config.actions) {
            var akey = self.config.actions[i];
            if (self.config.extra_actions[akey]) {
                needSelection = needSelection || self.config.extra_actions[akey].needSelection;
                var extra_action = self._buildSingleAction(akey,self.config.extra_actions[akey]);
                actionData.push(extra_action);
            } else if (defaultSingleActions[akey]) {
                actionData.push(defaultSingleActions[akey]);
            } else if (defaultGlobalActions[akey]) {
                needSelection = needSelection || defaultGlobalActions[akey].needSelection;
                actionData.push(defaultGlobalActions[akey]);
                //hasGlobalAction = true;
            } else {
                log.warn('Action not found with key ' + akey);
            }
        }
        // basta che un azione contenga la needselection che devo disegnare le checkbox
        return {actionData:actionData,needSelection : needSelection};
    },


    _renderSingleActions : function (actionConf) {
        var self = this;

        //var actionConf = self._getActionsConfig();
        // le associo ad ogni riga
        var numRow = self.data.value.length;
        for (var i=0;i<numRow;i++) {
            var actionsValues = [];
            for (var a in actionConf.actionData) {
                //console.log("check istance ",actionConf.actionData[a].action,actionConf.actionData[a] instanceof CollectionAction );
                if (actionConf.actionData[a] instanceof CollectionAction)
                    continue
                var actionData = actionConf.actionData;
                //var needSelection = actionConf.needSelection;
                var tmpValues = self._getTemplateActionData(i,actionData[a]);
                actionsValues.push(tmpValues);
            }
            var rowContainer = self.jQe.find('[data-view_row_elements]').get(i);
            //in questo caso posso eliminare l'intera colonna
            if (actionsValues.length == 0 && !actionConf.needSelection) {
                $( $(rowContainer)).find('[data-col_actions]').remove();
                continue;
            }
            log.debug('ViewCollection._renderSingleActions  actionValues',actionsValues[i]);
            var actHtml = $.getTemplate('#'+ self.prefixTemplateClass + '_view_single_action_tpl',{pk:self.data.value[i].id,data:actionsValues});

            $( $(rowContainer)).find('[data-col_actions]').html(actHtml);

            if (!actionConf.needSelection) {
                $( $(rowContainer)).find('[data-col_actions]').find('[data-check]').remove();
            }
        }

    },
    /**
     * controlla che la lista abbia l'azione removeAll perche' se non c'e' l'ha non
     * @private
     */
    _hasNeedSelectionAction : function () {
        var self = this;
        for (var i in self.config.actions) {
            var akey = self.config.actions[i];
            if (defaultGlobalActions[akey] && defaultGlobalActions[akey].needSelection) {
                return true;
            }
            if (self.config.extra_actions[akey] && self.config.extra_actions[akey].needSelection) {
                return true;
            }
        }
        return false;
    },
    /**
     * controlla se la view ha almeno una azione che lavora sul singolo record della lista
     * @returns {boolean}
     * @private
     */
    _hasRecordActions : function () {
        var self = this;
        for (var i in self.config.actions) {
            var akey = self.config.actions[i];
            if (defaultSingleActions[akey])
                return true;
            if (self.config.extra_actions[akey] instanceof RecordAction)
                return true;
        }
        return false;
    }
});

/**
 * VERSIONE LIBRERIA 3
 */

var ViewRecord = CoreView.extend({
    _pkName : 'id',
    _pkValue : null,

    successMsg : function (msg) {
        var self = this;
        $(self.config.container).find('[data-alert]').removeClass('hide').html(msg);
        setTimeout(function () {
            $(self.config.container).find('[data-alert]').addClass('hide').html('');
        },1000);
    },
    /**
     * ritorna i valori di istanza dei parametri definiti nella funzione nei
     * dati del modello
     * @param func : function definita nell'oggetto
     * @return vettore di valori
     * */
    _buildFunctionParams : function (func) {
        var self = this;
        var params = {};
        var args = func.toString ().match (/function\s*\w*\s*\((.*?)\)/)[1].split (/\s*,\s*/);
        for (var a in args)
            params[args[a] ] = self.data.value[ args[a] ];
        return  _.values(params);
    },
    _evaluateFunctionProp : function (prop) {
        var self = this;
        if (!prop)
            return '';
        if (_.isFunction(prop)) {
            var fValues = self._buildFunctionParams(prop);
            return prop.apply(null, fValues);
        }
        return prop;
    },
    _render : function () {
        var self = this;
        // setto il template principale della view
        //console.log("EDIT ",self.jQe.find('[data-view_elements]'));
        self.jQe.find('[data-view_elements]').attr('data-view_elements',self.modelName);
        self._setKeys();
        for (var key in self.keys) {
            self._renderElement(self.keys[key]);
        }

        for (var i in self.keys) {
            self.renderObjs[0][ self.keys[i] ].finalize();
        }
        //if (!self.isHasMany)
        self._renderActions();
        self._attachEvents();

        for (var i in self.keys) {
            self._connectFields( self.keys[i] );
        }

    },
    _configViewCustomComplex : function () {
        var self = this;
        // solo la prima volta mi prendo i riferimenti ai template
        if (Object.keys(self._customAttrs) == 0) {
            self._customAttrs.container = $(self.config.container);
            self._customAttrs.sourceHtml = $.getDomTemplate(self._customAttrs.container).html();
            self._customAttrs.actionTpl = '#default_view_edit_action_item_tpl';
            //self._customAttrs.actionGlobalTpl = '#default_view_global_action_tpl';
        }
    },
    _renderViewCustomComplex : function () {
        var self = this;
        // creo gli oggetti render

        $(self._customAttrs.container).html(self._customAttrs.sourceHtml);
        $.each($(self._customAttrs.container).find('render'), function() {
            self._createRender($(this),$(this).attr('data-field'));
        });

        // chiamo la funzione render per ogni oggetto
        for (var k in self.renderObjs[0]) {
            self.renderObjs[0][k].render();
        }

        // chiamo la funzione finalize per ogni oggetto
        for (var k in self.renderObjs[0]) {
            self.renderObjs[0][k].finalize();
        }

        var configAction = self._getActionsConfig();
        console.log(configAction);
        var _findAction = function (name) {
            for (var i in configAction) {
                if (configAction[i].action == name)
                    return configAction[i];
            }
            return null;
        }

        $.each($(self.config.container).find('action'), function () {
            var name = $(this).attr('name');
            var actionData = _findAction(name);
            if (!actionData) {
                throw "action not found " + name;
            }
            var tplData = self._getTemplateActionData(actionData);
            var html = $.getTemplate(self._customAttrs.actionTpl, tplData);
            $(this).html(html);

        });

        self._attachEvents();
        for (var i in self.keys) {
            self._connectFields( self.keys[i] );
        }
    },
    
    _configViewCustomBase : function () {
        var self = this;
        // solo la prima volta mi prendo i riferimenti ai template
        var container = $.createDynamicContainer(self.config.container);;
        if (Object.keys(self._customAttrs) == 0) {
            //self._customAttrs.container = $(self.config.container);
            self._customAttrs.sourceContainer =  '#' + container.attr('id');
            //self._customAttrs.actionTpl = '#default_view_single_action_item_tpl';
            //self._customAttrs.actionGlobalTpl = '#default_view_global_action_tpl';
        }
    },
    _renderViewCustomBase : function () {
        var self = this;
        var tplData =  self.data.value;
        $.renderTemplate($(self._customAttrs.sourceContainer),self.config.container,tplData);

    },
    _setKeys : function () {
        var self = this;
        log.debug('ViedEdit._setKeys',self.config.fields);
        self.keys = self.config.fields;//Object.keys(self.config.fields);
        if (self.keys.length === 0) {
            if (self.data.value)
                self.keys = Object.keys(self.data.value);
        }

    },

    _getDefaultStructure : function(key) {
        var self = this;
        var label = 'left';

        switch(self._getRenderType(key)){
            case 'hasmany':
            case 'hasmany_through':
            case 'upload':
            case 'video':
                label = 'no';
                break;
        }

        var config = self._getRenderConfig(key);

        if (config.label) {
            return config.label;
        }

        return label;
    },

    _renderElement : function (key) {
        var self = this;
        var type = self.config.fields_type[key]?self.config.fields_type[key].type:'input';
        // caso speciale per gli hidden che non hanno struttura html
        if (type == 'input' && self.config.fields_type[key] && self.config.fields_type[key].inputType=="hidden") {
            var container = $.createDynamicContainer();
            var r = self._createRender(container,key);
            r.render();
            self.jQe.find('[data-hidden_fields]').append(container.html());
            r.container = self.jQe.find('[data-hidden_fields]');
            container.remove();
            return ;
        }

        var structure = self._getDefaultStructure(key); //self.config.labels?self.config.labels:'left';
        log.debug('key',key,'templateId','#'+self.prefixTemplateClass+'_' + structure + '_view_edit_tpl');
        var container = $.createDynamicContainer('#'+self.prefixTemplateClass+'_' + structure + '_view_edit_tpl');

        var safeKey = key.replace(/[\])}\[{(]/g, '');
        container.find('.' + self.type + '-field').addClass('field-' + safeKey + ' ' + self.modelName + '-field-' + safeKey);
        //container.first().attrs()
        //container.find('div').addClass('view-field-'+safeKey);
        //if (!window.bo)
        //    window.bo = container.first();
        $(container.first().children()[0]).addClass('view-field-'+safeKey);
        //console.log('aaaaa',container.first()[0].attributes);
        self._translateItem(container, safeKey);
        if (self.langs.length > 1) {
            var imgLang = self._langField(self.config,key);
            self._renderImgLang(container,imgLang);
        }
        container.find('[data-field_value]').attr('data-field_value',key);
        //console.log(container.html());

        self.jQe.find('[data-view_elements="' + self.modelName + '"]').append(container.html());
        container.remove();
        var realContainer = self.jQe.find('[data-view_elements="' + self.modelName + '"]').find('[data-field_value="' + key +'"]');

        var r = self._createRender(realContainer,key);
        r.render();
    },

    _createRender : function (container,key) {
        var self = this;
        var type = self._getRenderType(key);
        var classData = Render.getClassData(type);



        // i dati potrebbero essere recuperati con chiamata ajax percio' devo aggiornali dopo

        var rdata = {} ;
        var rconfig = self._getRenderConfig(key,classData);
        rconfig.container = container;
        rconfig.container.addClass('field-'+key);
        var render = Render.factory(self._getFieldName(key), _.extend(rconfig,rdata),type);
        if (!render) {
            log.error('ViewRecord._createRender failed',key,type,classData);
        }
        if (!self.renderObjs[0])
            self.renderObjs[0] = {};

        self.renderObjs[0][key] = render;
        rdata =  self._getRenderData(key,classData);
        render.attrs(rdata);
        return render;
    },

    _getActionsConfig : function () {
        var self = this;
        var actionData =  [];
        for (var i in self.config.actions) {
            var akey = self.config.actions[i];
            if (self.config.extra_actions && self.config.extra_actions[akey]) {
                var extra_action = self._buildSingleAction(akey,self.config.extra_actions[akey]);
                actionData.push(extra_action);
            } else if (defaultSingleActions[akey]) {
                actionData.push(defaultSingleActions[akey]);
            } else if (defaultGlobalActions[akey]) {
                //hasGlobalAction = true;
            } else {
                log.warn('Action not found with key ' + akey);
            }
        }
        return actionData;
    },

    _getTemplateActionData : function (actionObject) {
        var self = this;
        var tmpValues = new RecordAction(actionObject);
        //console.log('ACTION TEXT',actionData[a]);
        tmpValues.pk = self.data.value.id;
        tmpValues.actionText = self._evaluateFunctionProp(actionObject.actionText);
        tmpValues.actionTitle = self._evaluateFunctionProp(actionObject.actionTitle);
        tmpValues.actionIcon = self._evaluateFunctionProp(actionObject.actionIcon);
        tmpValues.actionClass = self._evaluateFunctionProp(actionObject.actionClass);
        tmpValues.visible = self._evaluateFunctionProp(actionObject.visible);
        tmpValues.enabled = self._evaluateFunctionProp(actionObject.enabled);
        tmpValues.href = null;
        tmpValues.params = self._buildFunctionParams(actionObject.func);
        if (tmpValues.control_type == 'link') {
            actionObject.view = self;
            tmpValues.href = actionObject.func.apply(actionObject, tmpValues.params);
            tmpValues.target = self._evaluateFunctionProp(actionObject.target);
        }
        tmpValues.params = JSON.stringify(tmpValues.params);
        return tmpValues;
    },
    _renderActions : function() {
        var self = this;
        log.debug("_renderActions",self.modelName,self.config.actions.length,self.isHasMany);
        if (self.config.actions.length == 0 || self.isHasMany) {
            self.jQe.find('[data-view_action]').remove();
        } else {
            var actionData = self._getActionsConfig();
            log.debug("actionData",actionData.length);
            if (actionData.length === 0) {
                self.jQe.find('[data-view_action]').remove();
                return ;
            }
            var actionsValues = [];
            for (var a in actionData) {
                var tmpValues = self._getTemplateActionData(actionData[a]);
                actionsValues.push(tmpValues);
            }
            log.debug(actionsValues,self.jQe.find('[data-view_action]'));
            $.renderTemplate(self.jQe.find('[data-view_action]'),self.jQe.find('[data-view_action]'),{data:actionsValues});
        }
    },

    /**
     * controlla che il campo e' un campo in lingua. In caso positivo ritorna il token della lingua
     * altrimenti null
     * @param modelConf : configurazione javascript
     * @param key : nome del campo da anlizzare
     */
    _langField : function (modelConf,key) {
        var self = this;
        //console.log("CoreView._langField check ",key,modelConf,self.config.lang_fields);
        for (var i in self.config.lang_fields) {
            var f = self.config.lang_fields[i];
            var lang = key.replace(new RegExp(f+'_', 'g'),'');
            if ($.inArray(lang,self.config.langs) >= 0) {
                log.debug('found key to translate',key,lang);
                return lang;
            }
        }
        return null;

    },
    /**
     * setta il src giusto dell'immagine dedicata alla lingua in base al token della lingua
     * @param lang : token lingua
     * @param obj : contenitore html
     */
    _renderImgLang : function (obj,lang) {
        if (!lang)
            return obj;
        obj.find("[data-img_lang]").attr("src","/viewimage/"+lang+".jpg/imagecache/lang-icon").removeClass("hide");
        return obj;
    },
    _getFieldName : function (key) {
        var self = this;
        return key;
    },
    _translateItem: function (obj, fieldkey) {
        var self = this;
        var key = fieldkey;
        key = Utility.camelCase(self.modelName) + '-' + fieldkey;
        key = key.replace(/[\])}\[{(]/g, '');
        if ($.langDefs[key + '_msg']) {
            console.log("find [data-html_msg]",obj.find('[data-html_msg]').length);
            //console.log('TRANSLATION exist ' + key + '_msg',self.data.translations[key + '_msg'])
            obj.find('[data-html_msg]').addClass(fieldkey + '-msg ' + key + '-msg').html($.translate(key + '_msg'));
        } else {
            obj.find('[data-html_msg]').hide();
        }

        if ($.langDefs[key + '_addedLabel']) {
            //console.log('TRANSLATION exist ' + key + '_addedLabel',self.data.translations[key + '_addedLabel'])

            obj.find('[data-html_addedLabel]').addClass(fieldkey + '-addedLabel ' + key + '-addedLabel').html($.translate(key + '_addedLabel'));
        } else {
            obj.find('[data-html_addedLabel]').hide();
        }
        //var label_html = obj.find('[data-html_label]').html();
        //obj.find('[data-html_label]').addClass(fieldkey + '-label ' + key + '-label').html(self.model.translations[key + '_label'] + '<br/>' + label_html);
        obj.find('[data-html_label]').addClass(fieldkey + '-label ' + key + '-label');
        obj.find('[data-html_field]').html($.translate(key + '_label') )

    },

    _attachEvents : function () {
        var self = this;
        for (var key in self.renderObjs[0]) {
            var render = self.renderObjs[0][key];
            var pk = self.data.value.id;
            self._attachEvent(render,pk);
        }
    },
    /**
     * restituisce l'oggetto data da assegnare all'oggetto render
     */
    _getRenderData : function (key,realType) {
        var self = this;
        var type = self._getRenderType(key);
        //if (realType)
        //    type = realType;
        // controllo che non ci sia definita una funzione speciale per i dati dell'oggetto render
        var funcName = '_get' + Render.getClassData(type) + 'Data';
        log.debug(key,type," check " + funcName);
        if (_.isFunction(self[funcName])) {
            return self[funcName](key);
        }
        var rdata = {
            value : self.data.value[key]
        };
        return rdata;
    },
    _getRenderMapData : function (key) {
        var self = this;
        log.debug('_getRenderMapData');
        var rconfig = self._getRenderConfig(key);
        var latValue = 0;
        var lngValue = 0;
        if (rconfig.center_map) {
            latValue = rconfig.center_map[0];
            lngValue = rconfig.center_map[1];
        }

        if (rconfig.belongsto) {
            var table = rconfig.lat_field.split('-')[0];
            var field = rconfig.lat_field.split('-')[1];
            if (self.data.value[table][field])
                latValue = self.data.value[table][field];
            field = rconfig.lng_field.split('-')[1];
            if (self.data.value[table][field])
                lngValue = self.data.value[table][field];
        }
        var rdata = {
            value :  {
                lat :latValue,
                lng :lngValue
            },
            mapKey : Facade.confs.mapKey,
        };
        return rdata;
    },

    _getRenderHasmanyData : function (key) {
        var self = this;
        // ridefinisco la jsonData per prendere tutti i valori resultParams attraverso
        // chiamata ajax
        //console.log(self.renderObjs[0]);
        var rdata = {
            value : self.data.value[key],
            //resultParams : _.has(self.data.resultParams[key],'resultParams')?self.data.resultParams[key].resultParams:self.data.resultParams[key].fields,
        };
        if (!self.renderObjs[0][key]) {
            log.warn('render hasmany ' + key +  ' viewkey ' + self.keyId +  " is undefined");
            return rdata;
        }
        self.renderObjs[0][key].getJsonData = function (callback) {
            /*
             var _callback = function (json) {
             if (json.error)
             callback([]);
             callback(json.result);
             }
             */
            self._controller.execute(
                'insertHasmany',
                {'model':Utility.snakeCase(self.data.resultParams[key].modelRelativeName)},
                {},
                callback
            );
        }
        var rdata = {
            value : self.data.value[key],
            //resultParams : _.has(self.data.resultParams[key],'resultParams')?self.data.resultParams[key].resultParams:self.data.resultParams[key].fields,
        };

        return rdata;
    },
    _getRenderAutocompleteData : function (key) {
        var self = this;
        var rconfig = self._getRenderConfig(key);
        var relationModel = rconfig.autocompleteModel;
        if (rconfig.relationModel) {
            relationModel = rconfig.relationModel;
        }
        var modelKey = Utility.camelCase(relationModel);
        var rdata = {
            value : self.data.value[key],
            modelData : self.data.value[modelKey]
        };
        return rdata;
    },

    _getRenderCustomData : function (key) {
        var self = this;
        /*
         var rconfig = self._getRenderConfig(key);
         var value = "";
         if (_.isFunction(rconfig.htmlValue)) {
         var fValues = self._buildFunctionParams(rconfig.htmlValue);
         value = rconfig.htmlValue.apply(self, fValues);
         } else
         value = rconfig.htmlValue;
         */
        var rdata =  {
            value : self.data.value[key],
            modelData : self.data.value
        };
        return rdata;
    },

    _getRenderChoiceData : function(key) {
        var self = this;
        //alert("get render selct data " + key)

        log.debug('_getRenderChoiceData',key,self.data.resultParams[key]);
        var rconfig = self._getRenderConfig(key);
        var domainValues = {};
        var domainValuesOrder = false;
        if (_.isFunction(rconfig.domainValues)) {
            var fValues = self._buildFunctionParams(rconfig.domainValues);
            domainValues = rconfig.domainValues.apply(self, fValues);
        }
        else if (self.data.resultParams[key] && self.data.resultParams[key].options) {
            domainValues = self.data.resultParams[key].options;
            if(self.data.resultParams[key].options_order) {
                domainValuesOrder = self.data.resultParams[key].options_order;
            }
        }
        var rdata = {
            value : self.data.value[key],
            domainValues : domainValues,
            domainValuesOrder : domainValuesOrder,
        };
        return rdata;
        /*
         var rdata = {
         value : self.data.value[key],
         domainValues : self.data.resultParams[key].options
         };
         return rdata;
         */
    },

    _getRenderSelectData : function(key) {
        var self = this;
        log.debug('_getRenderSelectData',key,self.data.resultParams[key]);
        var rconfig = self._getRenderConfig(key);
        var domainValues = {};
        var domainValuesOrder = false;
        if (_.isFunction(rconfig.domainValues)) {
            var fValues = self._buildFunctionParams(rconfig.domainValues);
            domainValues = rconfig.domainValues.apply(self, fValues);
        } else if (rconfig.domainValues) {
            domainValues = rconfig.domainValues;
        } else if (self.data.resultParams[key] && self.data.resultParams[key].options) {
            domainValues = self.data.resultParams[key].options;
            if(self.data.resultParams[key].options_order) {
                domainValuesOrder = self.data.resultParams[key].options_order;
            }
        }

        var rdata = {
            value : self.data.value[key],
            domainValues : domainValues,
            domainValuesOrder : domainValuesOrder,
        };
        return rdata;
    },
    _getRenderInputHelpedData : function(key) {
        var self = this;
        log.debug("_getRenderInputHelpedData",key,self.data.resultParams[key]);
        var rconfig = self._getRenderConfig(key);
        var domainValues = {};
        var domainValuesOrder = false;
        if (_.isFunction(rconfig.domainValues)) {
            var fValues = self._buildFunctionParams(rconfig.domainValues);
            domainValues = rconfig.domainValues.apply(self, fValues);
        }
        else if (self.data.resultParams[key] && self.data.resultParams[key].options) {
            domainValues = self.data.resultParams[key].options;
            if(self.data.resultParams[key].options_order) {
                domainValuesOrder = self.data.resultParams[key].options_order;
            }
        }
        var rdata = {
            value : self.data.value[key],
            domainValues : domainValues,
            domainValuesOrder : domainValuesOrder,
        }
        return rdata;
    },
    _getRenderBetweenDateData : function (key) {
        var self = this;
        var rconfig = self._getRenderConfig(key);
        //console.log("aaaaaaaaaaa",rconfig,self.data.value,self.data.value[rconfig.date_end]);
        var rdata = {
            value : self.data.value[key],
            end_value : self.data.value[rconfig.end_key],
        }
        return rdata;
    },
    _getRenderRangeData : function (key) {
        var self = this;
        var rconfig = self._getRenderConfig(key);
        //console.log("aaaaaaaaaaa",rconfig,self.data.value,self.data.value[rconfig.date_end]);
        var domainValues = {};
        var domainValuesOrder = null;
        if (_.isFunction(rconfig.domainValues)) {
            var fValues = self._buildFunctionParams(rconfig.domainValues);
            domainValues = rconfig.domainValues.apply(self, fValues);
        } else if (rconfig.domainValues) {
            domainValues = rconfig.domainValues;
        } else if (self.data.resultParams[key] && self.data.resultParams[key].options) {
            domainValues = self.data.resultParams[key].options;
            if(self.data.resultParams[key].options_order) {
                domainValuesOrder = self.data.resultParams[key].options_order;
            }
        }
        var rdata = {
            value : self.data.value[key],
            end_value : self.data.value[rconfig.end_key],
            domainValues : domainValues,
            domainValuesOrder : domainValuesOrder,
        }
        // nel caso di chiavi uguali considero value un array
        if (key == rconfig.end_key && self.data.value[key]) {
            rdata.value = self.data.value[key][0];
            rdata.end_value = self.data.value[key][1];
        }



        return rdata;
    },
    // setta il valore dell'oggetto render di key
    setRenderData : function (key,value) {
        var self = this;
        if (!self.renderObjs[0][key])
            throw "Render with key= " + key + " not found";
        self.renderObjs[0][key].setValue(value);
    },
    // restituisce l'oggetto render associato alla key
    getRenderObj : function(key) {
        return this.renderObjs[0][key];
    },
    /**
     * crea il vettore dei campi connessi ad un determinata key
     */
    _connectFields : function (key) {
        var self = this;
        if (!self.renderObjs[0][key])
            return ;
        if (self.renderObjs[0][key].dependencies) {
            var dependencies = self.renderObjs[0][key].dependencies;
            for (var k in dependencies.sources) {
                var sourceKey = dependencies.sources[k];
                if (!self.connectedObjs[sourceKey])
                    self.connectedObjs[sourceKey] = [];
                //alert('connect ' + sourceKey + " to "  + key);
                self.connectedObjs[sourceKey].push(key);
                // spedisco l'evento per la configurazione iniziale
                self.renderObjs[0][sourceKey]._emitEvent('change',self.data.value[sourceKey])
            }
        }
    },
    fireToConnected : function (evt) {
        var self = this;
        for (var k in self.connectedObjs) {
            var key = k;
            if (self.isHasMany) {
                key = self._getFieldName(key);
            }
            if (key == evt.key) {
                for (var i in self.connectedObjs[k]) {
                    var destKey = self.connectedObjs[k][i];
                    log.debug('ViewRecord.fireToConnected evt',evt,'rObject',self.renderObjs[0][destKey]);
                    var func = self.renderObjs[0][destKey].dependencies.func;
                    if (!_.isFunction(func) ) {
                        throw "func is not function in object " + destKey;
                    }
                    var container = $(self.config.container).find(self.renderObjs[0][destKey].container);

                    func.apply(self,[evt,container]);

                }
            }
        }
        return ;
        // codice non tiene conto quando una view e' hasmany
        var self = this;
        if (self.connectedObjs[evt.key]) {
            for (var i in self.connectedObjs[evt.key]) {
                var destKey = self.connectedObjs[evt.key][i];
                log.debug('ViewRecord.fireToConnected evt',evt,'rObject',self.renderObjs[0][destKey]);
                var func = self.renderObjs[0][destKey].dependencies.func;
                if (!_.isFunction(func) ) {
                    throw "func is not function in object " + destKey;
                }
                var container = $(self.config.container).find(self.renderObjs[0][destKey].container);

                func.apply(self,[evt,container]);

            }
        }
    }
});
/**
 * VERSIONE LIBRERIA 3
 */

var ViewList = ViewCollection.extend({
    visibleKeys: [],
    keys: [],
    init: function (modelName, data, config) {
        this._super(modelName, data, config);
        this.type = 'list';
        this.defaultRenderType = 'text';
        //this.defaultRenderClassName = 'text';
        this.routeType = 'list';
    },

    getModelData: function (index) {
        throw 'ViewList.getModelData not implemented';
    }
});

var ViewEdit = ViewRecord.extend({
    visibleKeys: [],
    keys: [],
    isHasMany: false,
    hasManyIndex : null, // indice view hasmany da inserire nella creazione dei nomi dei campi
    init: function (modelName, config, data) {

        this._super(modelName, config, data);
        this.visibleKeys = [];
        this.keys = [];
        this.type = 'edit';
        this.renderObjs[0] = {};
        this.defaultRenderType = 'input';
        //this.defaultRenderClassName = 'input';
        this.routeType = 'edit';
    },

    _getFieldName: function (key) {
        var self = this;
        console.log('ViewEdit._getFieldName',self.isHasMany);
        if (self.isHasMany) {
            var name = Utility.camelCase(self.modelName) + '-' + key;
            name += self.hasManyIndex === null ? '[]' : '[' + self.hasManyIndex + ']';
            return name;
        }
        return key;
    },

    _render: function () {

        var self = this;

        self._super();

            if (self.isHasMany) {
                var buttons = $.getTemplate('#default_hasmany_item_buttons_tpl', {});
                // tmpContainer.append(buttons);

                $(self.config.container).find('[data-edit-main]').append(buttons);
                //console.log("CONTAINER: ", $(self.config.container).find('[data-edit-main]'));
                //console.log("HTML: ", $(self.config.container).html());
            }
    }
});

var ViewEditG2 = ViewEdit.extend({
    _renderElement: function (key) {
        var self = this;
        if (self.isHasMany) {
            //log.debug("RENDERIZZO KEY ",key);
        }
        // caso speciale per gli hidden che non hanno struttura html
        var type = self.config.fields_type[key] ? self.config.fields_type[key].type : 'input';
        var container = null;
        if (type == 'input' && self.config.fields_type[key] && self.config.fields_type[key].inputType=="hidden") {
            container = $.createDynamicContainer();
            var r = self._createRender(container, key);
            r.render();
            self.jQe.find('[data-hidden_fields]').append(container.html());
            r.container = self.jQe.find('[data-hidden_fields]');
            container.remove();
            return;
        }
        var structure = self._getDefaultStructure(key); //self.config.labels?self.config.labels:'left';
        container = $.createDynamicContainer('#' + self.prefixTemplateClass + '_' + structure + '_view_edit_tpl');
        var safeKey = key.replace(/[\])}\[{(]/g, '');
        container.find('.' + type + '-field').addClass('field-' + safeKey + ' ' + self.modelName + '-field-' + safeKey);
        $(container.first().children()[0]).addClass('view-field-'+safeKey);

        self._translateItem(container, safeKey);
        if (self.langs.length > 1) {
            var imgLang = self._langField(self.config, key);
            self._renderImgLang(container, imgLang);
        }
        container.find('[data-field_value]').attr('data-field_value', key);
        var group = self._getGroup(key);
        self.jQe.find('[data-view_elements="' + self.modelName + '"]')
            .find('[data-group="' + group + '"]')
            .append(container.html());
        //self.jQe.find('[data-view_elements="' + self.modelName + '"]').append(container.html());
        container.remove();
        var realContainer = self.jQe.find('[data-view_elements="' + self.modelName + '"]').find('[data-field_value="' + key + '"]');

        var r = self._createRender(realContainer, key);
        r.render();
    },
    _getGroup: function (key) {
        var self = this;
        var group = 'g0';
        for (var g in self.config.groups) {
            if ($.inArray(key, self.config.groups[g].fields) >= 0) {
                return g;
            }
        }
        return group;
    }
});

var ViewEditG3 = ViewEditG2.extend({});

var ViewEditG4 = ViewEditG3.extend({});

var ViewEditG5 = ViewEditG4.extend({});

var ViewWizard = ViewEdit.extend({
    _currentWizard : 0,
    _render : function () {
        var self = this;
        self._currentWizard = 0;
        var section = $(self.jQe).find('[data-wizard]')[0].outerHTML;
        var keys = _.union([],self.config.wizard[0].fields);
        for (var i=1;i<self.config.wizard.length;i++) {
            //$(self.jQe).find('[data-wizard]').attr('data-wizard',i);
            //$(self.jQe).find('[data-wizard]').clone();


            section  = $(section).attr('data-wizard',i)[0].outerHTML;
            //console.log('section',$(section).html());
            $(self.jQe).find('[data-view_elements]').append(section);
            keys = _.union(keys,self.config.wizard[i].fields);
        }
        self.config.fields = keys;
        self._super();
    },

    _finalize : function () {
        var self = this;
        $(self.config.container).find('[data-button_back]').click(function () {
            self._back();
        })
        $(self.config.container).find('[data-button_forward]').click(function () {
            self._forward();
        })
        self._switchWizard(0,0);
        //$(self.config.container).find('[data-wizard_title]').html(self.config.wizard[0].title);
        self._super();
    },

    _back : function () {
        var self = this;
        if (self._currentWizard == 0)
            return ;
        self._currentWizard--;
        self._switchWizard(self._currentWizard+1,self._currentWizard);
    },

    _forward : function () {
        var self = this;
        if (self._currentWizard >= self.config.wizard.length-1) {
            $(self.config.container).find('[data-alert]').addClass('hide').html('');
            // salvataggio
            self._save();
            return;
        }
        self._currentWizard++;
        self._switchWizard(self._currentWizard-1,self._currentWizard);
    },
    _save : function () {
        var self = this;
        if (self.config.extra_actions && self.config.extra_actions.actionSave) {
            if (_.isFunction(self.config.extra_actions.actionSave.func) ) {
                self.config.extra_actions.actionSave.view = self;
                self.config.extra_actions.actionSave.func();
                return ;
            }
            
        }
        self._controller.actionSave(self.keyId,self.pk,{},function (json) {
            if (json.error) {
                $(self.config.container).find('[data-alert]').removeClass('hide').html(json.msg);
            }
        });
    },
    _switchWizard : function(hide,show) {
        var self = this;
        $(self.config.container).find('[data-wizard_title]').html(self.config.wizard[show].title);
        $(self.config.container).find('[data-wizard="' + hide + '"]').addClass('hide');
        $(self.config.container).find('[data-wizard="' + show + '"]').removeClass('hide');
        if (self._currentWizard == self.config.wizard.length-1) {
            $(self.config.container).find('[data-button_forward]').html('Salva');
        } else {
            $(self.config.container).find('[data-button_forward]').html('Avanti');
        }
        if (self._currentWizard == 0) {
            $(self.config.container).find('[data-button_back]').addClass('disabled').attr('disabled','disabled')
        } else {
            $(self.config.container).find('[data-button_back]').removeClass('disabled').removeAttr('disabled');
        }
    },
    _renderElement: function (key) {
        var self = this;
        // caso speciale per gli hidden che non hanno struttura html
        var type = self.config.fields_type[key] ? self.config.fields_type[key].type : 'input';
        var container = null;
        if (type == 'input' && self.config.fields_type[key] && self.config.fields_type[key].inputType=="hidden") {
            container = $.createDynamicContainer();
            var r = self._createRender(container, key);
            r.render();
            self.jQe.find('[data-hidden_fields]').append(container.html());
            r.container = self.jQe.find('[data-hidden_fields]');
            container.remove();
            return;
        }

        var structure = self._getDefaultStructure(key); //self.config.labels?self.config.labels:'left';
        container = $.createDynamicContainer('#' + self.prefixTemplateClass + '_' + structure + '_view_edit_tpl');
        var safeKey = key.replace(/[\])}\[{(]/g, '');

        container.find('.' + type + '-field').addClass('field-' + safeKey + ' ' + self.modelName + '-field-' + safeKey);
        $(container.first().children()[0]).addClass('view-field-'+safeKey);
        self._translateItem(container, safeKey);
        if (self.langs.length > 1) {
            var imgLang = self._langField(self.config, key);
            self._renderImgLang(container, imgLang);
        }
        container.find('[data-field_value]').attr('data-field_value', key);
        var wizard = self._getWizard(key);
        console.log('section wizard',key,wizard);
        self.jQe.find('[data-view_elements="' + self.modelName + '"]')
            .find('[data-wizard="' + wizard + '"]')
            .append(container.html());
        //self.jQe.find('[data-view_elements="' + self.modelName + '"]').append(container.html());
        container.remove();
        var realContainer = self.jQe.find('[data-view_elements="' + self.modelName + '"]').find('[data-field_value="' + key + '"]');

        var r = self._createRender(realContainer, key);
        r.render();
    },
    _getWizard: function (key) {
        var self = this;
        var wizard = '0';

        for (var w in self.config.wizard) {
            if ($.inArray(key, self.config.wizard[w].fields) >= 0) {
                return w;
            }
        }
        return wizard;
    },
    _getTemplate : function () {
        var self = this;
        var tplId = self.config.templateId;
        if (!tplId) {
            self.config.templateId = '#'+ self.prefixTemplateClass +'_view_'+self.type+'_wizard_tpl';
            tplId = self.config.templateId;
        }
        return $.createDynamicContainer(tplId);

        //return $.createDynamicContainer(tplId);
    },
})


var ViewSearch = ViewRecord.extend({
    init: function (modelName, data, config) {
        this._super(modelName, data, config);
        this.type = 'search';
        this.defaultRenderType = 'input';
        //this.defaultRenderClassName = 'input';
        this.renderObjs[0] = {};
        this.routeType = 'search';
    },
    getParams: function () {
        var self = this;
        var form = $(self.config.container).find('form');
        if (form.length === 0)
            throw 'impossibile trovare il form search in ' + self.config.container;
        return form.serializeAssoc();
    },
    _renderElement: function (key) {
        var self = this;
        if (self.isHasMany) {
            //log.debug("RENDERIZZO KEY ",key);
        }
        // caso speciale per gli hidden che non hanno struttura html
        var type = self.config.fields_type[key] ? self.config.fields_type[key].type : 'input';
        var container = '';
        if (type == 'input' && self.config.fields_type[key] && self.config.fields_type[key].inputType=="hidden") {

            container = $.createDynamicContainer();
            var r = self._createRender(container, key);
            r.render();
            self.jQe.find('[data-hidden_fields]').append(container.html());
            r.container = self.jQe.find('[data-hidden_fields]');
            container.remove();
            return;
        }


        var structure = self._getDefaultStructure(key); //self.config.labels?self.config.labels:'left';
        container = $.createDynamicContainer('#' + self.prefixTemplateClass + '_' + structure + '_view_edit_tpl');
        var safeKey = key.replace(/[\])}\[{(]/g, '');
        container.find('.' + type + '-field').addClass('field-' + safeKey + ' ' + self.modelName + '-field-' + safeKey);
        $(container.first().children()[0]).addClass('view-field-'+safeKey);
        self._translateItem(container, safeKey);
        if (self.langs.length > 1) {
            var imgLang = self._langField(self.config, key);
            self._renderImgLang(container, imgLang);
        }
        container.find('[data-field_value]').attr('data-field_value', key);
        //console.log(container.html());

        self.jQe.find('[data-view_elements="' + self.modelName + '"]').append(container.html());
        container.remove();
        var realContainer = self.jQe.find('[data-view_elements="' + self.modelName + '"]').find('[data-field_value="' + key + '"]');
        var r = self._createRender(realContainer, key);
        r.render();
    },
    _render: function () {
        var self = this;
        self._super();
        if (self.keys.length === 0) {
            $(self.config.container).remove();
        }

    }
});

var ViewSearchG2 = ViewSearch.extend({
    getParams: function () {
        var self = this;
        var form = $(self.config.container).find('form');
        if (form.length === 0)
            throw 'impossibile trovare il form search in ' + self.config.container;
        return form.serializeAssoc();
    },
    _renderElement: function (key) {
        var self = this;

        // caso speciale per gli hidden che non hanno struttura html
        var type = self.config.fields_type[key] ? self.config.fields_type[key].type : 'input';
        if (type == 'input' && self.config.fields_type[key] && self.config.fields_type[key].inputType=="hidden") {
            console.log('SEARCH HIDDENT');
            var container = $.createDynamicContainer();
            var r = self._createRender(container, key);
            r.render();
            self.jQe.find('[data-hidden_fields]').append(container.html());
            r.container = self.jQe.find('[data-hidden_fields]');
            container.remove();
            return;
        }

        var structure = self._getDefaultStructure(key); //self.config.labels?self.config.labels:'left';
        console.log('SEARCH STRUCT', structure);
        var container = $.createDynamicContainer('#' + self.prefixTemplateClass + '_' + structure + '_view_edit_tpl');
        var safeKey = key.replace(/[\])}\[{(]/g, '');
        container.find('.' + type + '-field').addClass('field-' + safeKey + ' ' + self.modelName + '-field-' + safeKey);
        $(container.first().children()[0]).addClass('view-field-'+safeKey);
        self._translateItem(container, safeKey);
        if (self.langs.length > 1) {
            var imgLang = self._langField(self.config, key);
            self._renderImgLang(container, imgLang);
        }
        container.find('[data-field_value]').attr('data-field_value', key);
        //console.log(container.html());
        var group = self._getGroup(key);
        self.jQe.find('[data-view_elements="' + self.modelName + '"]').find('[data-group="' + group + '"]').append(container.html());
        //self.jQe.find('[data-view_elements="' + self.modelName + '"]').append(container.html());
        container.remove();
        var realContainer = self.jQe.find('[data-view_elements="' + self.modelName + '"]').find('[data-field_value="' + key + '"]');


        var r = self._createRender(realContainer, key);
        r.render();
    },
    _getGroup: function (key) {
        var self = this;
        var group = 'g0';
        for (var g in self.config.groups) {
            if ($.inArray(key, self.config.groups[g].fields) >= 0)
                return g;
        }
        return group;
    }
});

var ViewSearchAdvancedG2 = ViewSearchG2.extend({

    _getTemplate : function () {
        var self = this;
        var tplId = self.config.templateId;
        if (!tplId) {
            tplId = '#'+ self.prefixTemplateClass +'_view_'+self.type+'_advanced_group2_tpl';
            self.config.templateId = tplId;
        }
        console.log(tplId);
        return $.createDynamicContainer(tplId);
    },

});


var ViewView = ViewEdit.extend({
    init: function (modelName, data, config) {
        this._super(modelName, data, config);
        this.type = 'view';
        //this.renderObjs[0] = {};
        this.defaultRenderType = 'text';
        //this.defaultRenderClassName = 'text';
        this.routeType = 'view';
    },
});
var ViewViewG2 = ViewEditG2.extend({
    init: function (modelName, data, config) {
        this._super(modelName, data, config);
        this.type = 'view';
        //this.renderObjs[0] = {};
        this.defaultRenderType = 'text';
        //this.defaultRenderClassName = 'text'
        this.routeType = 'view';
    },
});

var ViewViewG3 = ViewEditG3.extend({
    init: function (modelName, data, config) {
        this._super(modelName, data, config);
        this.type = 'view';
        //this.renderObjs[0] = {};
        this.defaultRenderType = 'text';
        //this.defaultRenderClassName = 'text';
        this.routeType = 'view';
    },
});

var ViewCalendar = ViewCollection.extend({
    calendarContainer: null,
    init: function (modelName, data, config) {
        this._super(modelName, data, config);
        this.type = 'calendar';
        this.defaultRenderType = 'text';
        this.routeType = 'calendar';
    },

    _render: function () {
        var self = this;
        var jQe = self.jQe;
        console.log($(jQe).find('[data-calendar]').length);
        var options = {
            dayClick: function (date, jsEvent, view) {
                //alert('a day has been clicked!');
                // if (self.config.dayClick) {
                //     return self.config.dayClick(date, jsEvent, view);
                // }
                self.dayClick(date, jsEvent, view);
            },
            eventClick: function (calEvent, jsEvent, view) {
                // if (self.config.eventClick) {
                //     return self.config.eventClick(calEvent, jsEvent, view);
                // }
                self.eventClick(calEvent, jsEvent, view);
            },
            viewRender: function (view, element) {
                self.startDate = view.start.toDate();
                self.endDate = view.end.toDate();
                // if (self.config.viewRender) {
                //     self.config.viewRender(view, element);
                //     return;
                // }
                log.debug('VIEW RENDERE ' + view.start.toDate() + view.end.toDate());
                self.loadEvents();
            },
            eventAfterAllRender: function (view) {
                //console.log("DDDDD");
                if (self.count == 1)
                    return;
                self.count = 1;
                log.debug('VIEW AFTER   RENDERE ' + view.start.toDate() + view.end.toDate());

            }
        };
        options = _.extend(options,self.config.options);
        var dayClick = options['dayClick'];
        options['dayClick'] = function () {
            dayClick.apply(self, _.values(arguments));
        }

        var eventClick = options['eventClick'];
        options['eventClick'] = function () {
            eventClick.apply(self, _.values(arguments));
        }

        var viewRender = options['viewRender'];
        options['viewRender'] = function () {
            viewRender.apply(self, _.values(arguments));
        }

        var eventAfterAllRender = options['eventAfterAllRender'];
        options['eventAfterAllRender'] = function () {
            eventAfterAllRender.apply(self, _.values(arguments));
        }
        //Cambio il caller da calendar a view

        // for (var f in options) {
        //         console.log("CALENDARFUNC: ",f, options[f]);
        //     if (_.isFunction(options[f])) {
        //         console.log("CALENDARFUNC2: ",f);
        //         var func = options[f];
        //         options[f] = function () {
        //             func.apply(self, _.values(arguments));
        //         }
        //     }
        // }

        // options['viewRender'] = function (date, jsEvent, view) {
        //     viewRender.apply(self, _.values(this.arguments));
        // }

        console.log('OPSTION',options);
        $(jQe).find('[data-calendar]').fullCalendar(options);
        self.calendarContainer = $(jQe).find('[data-calendar]');


    },

    loadEvents: function () {
        var self = this;
        var jQe = self.jQe;
        $(jQe).find('[data-calendar]').fullCalendar('removeEvents');
        var events = [];
        //console.log(self.data.value);
        for (var i in self.data.value) {
            var value = self.data.value[i];
            //log.debug('calendar event value',value);
            var backgroundColor = 'green';
            var textColor = 'white';
            var title = 'notitle';
            if (self.config.backgroundColor) {

                var params = {};
                var args = self.config.backgroundColor.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                for (var a in args)
                    params[args[a]] = value[args[a]];
                backgroundColor = self.config.backgroundColor.apply(self, _.values(params));
            }
            if (self.config.textColor) {
                var params = {};
                var args = self.config.textColor.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                for (var a in args)
                    params[args[a]] = value[args[a]];
                textColor = self.config.textColor.apply(self, _.values(params));
            }
            if (_.isFunction(self.config.title) ) {
                var params = {};
                var args = self.config.title.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                for (var a in args)
                    params[args[a]] = value[args[a]];
                title = self.config.title.apply(self, _.values(params));
            } else {
                title = value[self.config.title];
            }
            //if (!parseInt(model.data.attivo))
            //  bgcolor = 'red';
            if (!value[self.config.data_inizio]) {
                log.warn('data evento non valida. Scartato:', value);
                continue;

            }
            var ev = {
                id: value[self.config.id] ? model.data[self.config.id] : value.id,
                title: title,
                start: value[self.config.data_inizio],
                end: value[self.config.data_fine] ? value[self.config.data_fine] : null,
                backgroundColor: backgroundColor,
                textColor: textColor
            };
            //log.info(value,'evento ',ev);
            events.push(ev);

        }
        log.info('aggiunti eventi ', events);
        $(jQe).find('[data-calendar]').fullCalendar('addEventSource', events);
    },

    dayClick: function (date, jsEvent, view) {

    },
    eventClick: function (calEvent, jsEvent, view) {

    },

    renderOld: function (options) {
        var self = this;
        self.options = options;
        self._setKeys();
        //console.log(self.model);
        $(options.calendar).fullCalendar('removeEvents');
        var events = [];
        if (self.model.length > 0) {
            for (var m in self.model) {
                var model = self.model[m];
                backgroundColor = 'green';
                textColor = 'white';
                if (self.modelConfs.backgroundColor) {
                    var params = {};
                    var args = self.modelConfs.backgroundColor.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                    for (var a in args)
                        params[args[a]] = model.data[args[a]];
                    backgroundColor = self.modelConfs.backgroundColor.apply(self._controller, _.values(params));
                }

                if (self.modelConfs.textColor) {
                    var params = {};
                    var args = self.modelConfs.textColor.toString().match(/function\s*\w*\s*\((.*?)\)/)[1].split(/\s*,\s*/);
                    for (var a in args)
                        params[args[a]] = model.data[args[a]];
                    textColor = self.modelConfs.textColor.apply(self._controller, _.values(params));
                }

                //if (!parseInt(model.data.attivo))
                //  bgcolor = 'red'; 
                var ev = {
                    id: model.data[self.modelConfs.id] ? model.data[self.modelConfs.id] : model.data.id,
                    title: model.data[self.modelConfs.title],
                    start: model.data[self.modelConfs.data_inizio],
                    end: model.data[self.modelConfs.data_fine] ? model.data[self.modelConfs.data_fine] : null,
                    backgroundColor: backgroundColor,
                    textColor: textColor
                };
                console.log("evento ", ev);
                events.push(ev);

            }
            log.info(events);
            $(options.calendar).fullCalendar('addEventSource', events);
        }
    }
});

var ViewCsvTreFasi = ViewRecord.extend({
    fileName: null,
    fileOriginalName: null,
    loadId: null,
    phases: ['upload', 'load', 'save'],
    currentPhase: 'upload',
    uploadForm: null,
    extraValues: {},   // valori degli extraValues field

    uploadPhase: 0,
    loadPhase: 1,
    savePhase: 2,

    init: function (modelName, config, data) {
        this._super(modelName, config, data);
        this.type = 'csv';
        this.renderObjs[0] = {};
        this.defaultRenderType = 'input';
        this.routeType = 'csv';
    },

    setPhase: function (phase) {
        var self = this;
        self.currentPhase = phase;
        self._getExtraFields();
    },

    goToNextPhase: function () {
        var self = this;
        var phase = self.currentPhase;
        switch (phase) {
            case 'upload':
                return self.setPhase('load');
            case 'load':
                return self.setPhase('save');
            case 'save':
                return self.setPhase('upload');

            default:
                //phase = phase + 1;
                return;
        }
    },

    showProgress: function (msg, progress) {
        var self = this;
        var prg = $(self.config.container).find('[data-csvstatus]');
        if (progress === false || progress === undefined) {
            $(prg).find(".progress").css("width", "100%");
            $(prg).find(".progress-bar").text(" ");
        } else {
            $(prg).find(".progress").css("width", progress + "%");
            $(prg).find(".progress-bar").text(progress + "%");
        }
        $(prg).find('[data-csvstatus_msg]').html(msg);
        $(prg).removeClass('hide');
    },
    hideProgress: function () {
        var self = this;
        $(self.config.container).find('[data-csvstatus]').addClass('hide');
    },
    _setKeys: function () {
        var self = this;
        var currentKeys = {}
        switch (self.currentPhase) {
            case self.phases[self.uploadPhase]:
                currentKeys = {};
                break;
            case self.phases[self.loadPhase]:
                currentKeys = self.config.load_fields ? self.config.load_fields : [];
                break;
            case self.phases[self.savePhase]:

                currentKeys = self.config.save_fields ? self.config.save_fields : [];
                break;
        }
        self.keys = Object.keys(currentKeys);
    },
    setLoadId: function (jobId) {
        var self = this;
        self.loadId = jobId;
        self.dataForm.find('input[name="csv_load_id"]').val(jobId).attr('value', jobId);
    },
    _finalize: function () {
        var self = this;
        self._initUploadForm();
    },

    _renderActions: function () {
        var self = this;
        switch (self.currentPhase) {
            case self.phases[self.uploadPhase]:
                self.config.actions = self.config.upload_actions;
                break;
            case self.phases[self.loadPhase]:
                $(self.config.container).find('form[name="upload_form"]').addClass('hide');
                $(self.config.container).find('[data-filename]').html(self.fileOriginalName);
                self.config.actions = self.config.load_actions;
                break;
            case self.phases[self.savePhase]:
                $(self.config.container).find('form[name="upload_form"]').addClass('hide');
                self.config.actions = self.config.save_actions;
                break;
        }
        console.log("csvview actions", self.config.actions);
        self._super();
        //self._controller.connectActions(self.keyId);
    },

    _render: function () {
        var self = this;
        self._super();
        self._setFormData();
        self._setExtraFields();
    },

    _getExtraFields: function () {
        var self = this;
        var data = self.getFormData();
        for (var field in self.keys) {
            self.extraValues[self.keys[field]] = data[self.keys[field]];
        }
    },
    _setExtraFields: function () {
        var self = this;
        for (var field in self.extraValues) {
            self.renderObjs[0][field].setValue(self.extraValues[field]);
        }
    },
    /**
     * la form data viene riscritta in tutte le fasi, devo reinizializzare i valori interni
     * che altrimenti vanno persi.
     * @private
     */
    _setFormData: function () {
        var self = this;
        self.uploadForm = $(self.config.container).find('form[name="upload_form"]');
        self.dataForm = $(self.config.container).find('form[name="data_form"]');
        self.dataForm.find('input[name="csvProviderName"]').val(self.config.providerName).attr('value', self.config.providerName);
        self.dataForm.find('input[name="fileName"]').val(self.fileName);
        self.dataForm.find('input[name="csv_load_id"]').val(self.loadId).attr('value', self.loadId);
    },
    _initUploadForm: function () {
        var self = this;
        self.uploadForm = $(self.config.container).find('form[name="upload_form"]');
        self.dataForm = $(self.config.container).find('form[name="data_form"]');
        self.dataForm.find('input[name="csvProviderName"]').val(self.config.providerName).attr('value', self.config.providerName);
        self.uploadForm.submit(function (e) {
            e.preventDefault();

            var options = {
                iframe: false,
                //target:        '#'+container,   // target element(s) to be updated with server response
                beforeSubmit: function () {
                    if (self._checkUploadFile()) {
                        self.fileName = null;
                        return true;
                    }
                    return false;
                }, //self.checkFormData,  // pre-submit callback
                success: function (json, textStatus, jqXHR) {
                    $.waitEnd();
                    if (json.error) {
                        $.errorDialog(json.msg);
                        return;
                    }
                    self.fileName = json.result['filename'];
                    self.fileOriginalName = json.result.original_name;
                    self.dataForm.find('input[name="fileName"]').val(json.result['filename']);
                    //$.messageDialog("File caricato con successo");
                    $(self.config.container).find('[data-action="loadcsv"]').prop("disabled", false);
                    self.currentPhase = self.phases[1]; // caricamento
                    self.render();
                    // perche' sto chiamando il render dall'interno di una view dico al controller di connettere le azioni
                    self._controller.connectActions(self.keyId);
                    //$(self.options.container).find('[data-action="savecsv"]').prop("disabled",true);
                }, //self.submitCallBack,  // post-submit callback
                error: function (jqXHR, textStatus, errorThrown) {
                    $.progressDialog().modal("hide");
                    $.errorDialog('error ' + textStatus);
                },
                complete: function () {
                    // STOP LOADING SPINNER
                }
            };
            $(this).ajaxSubmit(options);
            return false;
        });
        self.uploadForm.find('input[type="file"]').change(function () {
            $.waitStart();
            self.uploadForm.submit();
        });
    },
    _checkUploadFile: function () {
        var self = this;
        log.info("beforeLoadSubmit");
        var fileupload = self.uploadForm.find('input[name="file"]').val();
        if (!fileupload) {
            if (self.errors.length > 0) {
                var msg = self.errors.join("<br>");
                $.errorDialog(msg);
            } else
                $.errorDialog("Seleziona il file da caricare");
            return false;
        }
        //var ext = fileupload.match(/\.(.+)$/)[1];
        var extPos = fileupload.lastIndexOf('.');
        var ext = "";
        if (extPos >= 0) {
            ext = fileupload.substr(extPos + 1);
        }
        var cext = ext.toLowerCase();
        switch (cext) {
            case 'xls':
            case 'xlsx':
            case 'csv':
            case 'txt': /* case 'docx': case 'pdf': case 'wps': case 'rtf':  case 'txt': case 'xps': */
                if (self.iszip) {
                    $.waitEnd();
                    $.errorDialog("(" + cext + ") Estensione del file non valida");
                    var control = self.uploadForm.find('input[name="file"]');
                    control.val("");
                    return false;
                }
                break;
            case 'zip':
                if (!self.iszip) {
                    $.waitEnd();
                    $.errorDialog("(" + cext + ") Compressione file non accettata");
                    var control = self.uploadForm.find('input[name="file"]');
                    control.val("");
                    return false;
                }
                break;
            default:
                $.waitEnd();
                $.errorDialog("(" + cext + ") Estensione del file non riconosciuta");
                var control = self.uploadForm.find('input[name="file"]');
                control.val("");
                return false;
        }
        $(self.config.container).find('[data-action="loadcsv"]').prop('disabled', true);
        $(self.config.container).find('[data-action="savecsv"]').prop('disabled', true);

        return true;
    }
});


var ViewCsv = ViewRecord.extend({
    fileName: null,
    fileOriginalName: null,
    loadId: null,
    phases: ['load', 'save'],
    currentPhase: 'load',
    uploadForm: null,
    extraValues: {},   // valori degli extraValues field

    loadPhase: 0,
    savePhase: 1,

    origFieldsType : {},

    init: function (modelName, config, data) {
        this._super(modelName, config, data);
        this.type = 'csv';
        this.renderObjs[0] = {};
        this.defaultRenderType = 'input';
        this.routeType = 'csv';
        this.origFieldsType = this.config.fields_type ? this.config.fields_type : {} ;

    },

    setPhase: function (phase) {
        var self = this;
        self.currentPhase = phase;
        self._getExtraFields();
    },

    goToNextPhase: function () {
        var self = this;
        var phase = self.currentPhase;
        switch (phase) {
            // case 'upload':
            //     return self.setPhase('load');
            case 'load':
                return self.setPhase('save');
            case 'save':
                return self.setPhase('load');

            default:
                //phase = phase + 1;
                return;
        }
    },

    showProgress: function (msg, progress) {
        var self = this;
        var prg = $(self.config.container).find('[data-csvstatus]');
        if (progress === false || progress === undefined) {
            $(prg).find(".progress").css("width", "100%");
            $(prg).find(".progress-bar").text(" ");
        } else {
            $(prg).find(".progress").css("width", progress + "%");
            $(prg).find(".progress-bar").text(progress + "%");
        }
        $(prg).find('[data-csvstatus_msg]').html(msg);
        $(prg).removeClass('hide');
    },
    hideProgress: function () {
        var self = this;
        $(self.config.container).find('[data-csvstatus]').addClass('hide');
    },
    _setKeys: function () {
        var self = this;
        var currentKeys = [];
        console.log("csv load_fields", self.config.load_fields);
        console.log("csv fields", self.config.fields);
        switch (self.currentPhase) {
            case self.phases[self.loadPhase]:
                currentKeys = self.config.load_fields.length > 0 ? self.config.load_fields :
                    ( self.config.fields ? self.config.fields : []);

                if (self.config.load_fields_type && self.config.load_fields_type.length > 0) {
                    self.config.fields_type = self.config.load_fields_type;
                } else {
                    self.config.fields_type = self.origFieldsType;
                }
                break;
            case self.phases[self.savePhase]:

                currentKeys = self.config.save_fields.length > 0 ? self.config.save_fields :
                    ( self.config.fields ? self.config.fields : []);

                if (self.config.save_fields_type && self.config.save_fields_type.length > 0) {
                    self.config.fields_type = self.config.save_fields_type;
                } else {
                    self.config.fields_type = self.origFieldsType;
                }
                break;
        }
        self.keys = currentKeys;
        console.log("fields_type: ", self.config.fields_type);
    },
    setLoadId: function (jobId) {
        var self = this;
        self.loadId = jobId;
        self.dataForm.find('input[name="csv_load_id"]').val(jobId).attr('value', jobId);
    },
    _finalize: function () {
        var self = this;
        self._initUploadForm();
    },

    _renderActions: function () {
        var self = this;
        switch (self.currentPhase) {
            case self.phases[self.loadPhase]:
                // $(self.config.container).find('form[name="upload_form"]').addClass('hide');
                // $(self.config.container).find('[data-filename]').html(self.fileOriginalName);
                self.config.actions = self.config.load_actions;
                break;
            case self.phases[self.savePhase]:
                $(self.config.container).find('form[name="upload_form"]').addClass('hide');
                self.config.actions = self.config.save_actions;
                break;
        }
        console.log("csvview actions", self.config.actions);
        self._super();
        //self._controller.connectActions(self.keyId);
    },

    _render: function () {
        var self = this;
        self._super();
        self._setFormData();
        self._setExtraFields();
    },

    _getExtraFields: function () {
        var self = this;
        var data = self.getFormData();
        for (var field in self.keys) {
            self.extraValues[self.keys[field]] = data[self.keys[field]];
        }
    },
    _setExtraFields: function () {
        var self = this;
        for (var field in self.extraValues) {
            self.renderObjs[0][field].setValue(self.extraValues[field]);
        }
    },
    /**
     * la form data viene riscritta in tutte le fasi, devo reinizializzare i valori interni
     * che altrimenti vanno persi.
     * @private
     */
    _setFormData: function () {
        var self = this;
        self.uploadForm = $(self.config.container).find('form[name="upload_form"]');
        self.dataForm = $(self.config.container).find('form[name="data_form"]');
        self.dataForm.find('input[name="csvProviderName"]').val(self.config.providerName).attr('value', self.config.providerName);
        self.dataForm.find('input[name="fileName"]').val(self.fileName);
        self.dataForm.find('input[name="csv_load_id"]').val(self.loadId).attr('value', self.loadId);
    },
    _initUploadForm: function () {
        var self = this;
        self.uploadForm = $(self.config.container).find('form[name="upload_form"]');
        self.dataForm = $(self.config.container).find('form[name="data_form"]');
        self.dataForm.find('input[name="csvProviderName"]').val(self.config.providerName).attr('value', self.config.providerName);
        self.uploadForm.submit(function (e) {
            e.preventDefault();

            var options = {
                iframe: false,
                //target:        '#'+container,   // target element(s) to be updated with server response
                beforeSubmit: function () {
                    if (self._checkUploadFile()) {
                        self.fileName = null;
                        return true;
                    }
                    return false;
                }, //self.checkFormData,  // pre-submit callback
                success: function (json, textStatus, jqXHR) {
                    $.waitEnd();
                    if (json.error) {
                        $.errorDialog(json.msg);
                        return;
                    }
                    self.fileName = json.result['filename'];
                    self.fileOriginalName = json.result.original_name;
                    self.dataForm.find('input[name="fileName"]').val(json.result['filename']);
                    //$.messageDialog("File caricato con successo");
                    // $(self.config.container).find('[data-action="loadcsv"]').prop("disabled",false);
                    //self.currentPhase = self.phases[1]; // salvataggio
                    // self.render();
                    // perche' sto chiamando il render dall'interno di una view dico al controller di connettere le azioni
                    // self._controller.connectActions(self.keyId);
                    //$(self.options.container).find('[data-action="savecsv"]').prop("disabled",true);
                }, //self.submitCallBack,  // post-submit callback
                error: function (jqXHR, textStatus, errorThrown) {
                    $.progressDialog().modal("hide");
                    $.errorDialog('error ' + textStatus);
                },
                complete: function () {
                    // STOP LOADING SPINNER
                }
            };
            $(this).ajaxSubmit(options);
            return false;
        });
        self.uploadForm.find('input[type="file"]').change(function () {
            $.waitStart();
            self.uploadForm.submit();
        });
    },
    _checkUploadFile: function () {
        var self = this;
        log.info("beforeLoadSubmit");
        var fileupload = self.uploadForm.find('input[name="file"]').val();
        if (!fileupload) {
            if (self.errors.length > 0) {
                var msg = self.errors.join("<br>");
                $.errorDialog(msg);
            } else
                $.errorDialog("Seleziona il file da caricare");
            return false;
        }
        //var ext = fileupload.match(/\.(.+)$/)[1];
        var extPos = fileupload.lastIndexOf('.');
        var ext = "";
        if (extPos >= 0) {
            ext = fileupload.substr(extPos + 1);
        }
        var cext = ext.toLowerCase();
        switch (cext) {
            case 'xls':
            case 'xlsx':
            case 'csv':
            case 'txt': /* case 'docx': case 'pdf': case 'wps': case 'rtf':  case 'txt': case 'xps': */
                if (self.iszip) {
                    $.waitEnd();
                    $.errorDialog("(" + cext + ") Estensione del file non valida");
                    var control = self.uploadForm.find('input[name="file"]');
                    control.val("");
                    return false;
                }
                break;
            case 'zip':
                if (!self.iszip) {
                    $.waitEnd();
                    $.errorDialog("(" + cext + ") Compressione file non accettata");
                    var control = self.uploadForm.find('input[name="file"]');
                    control.val("");
                    return false;
                }
                break;
            default:
                $.waitEnd();
                $.errorDialog("(" + cext + ") Estensione del file non riconosciuta");
                var control = self.uploadForm.find('input[name="file"]');
                control.val("");
                return false;
        }
        $(self.config.container).find('[data-action="loadcsv"]').prop('disabled', true);
        $(self.config.container).find('[data-action="savecsv"]').prop('disabled', true);

        return true;
    }
});

var ViewCsvG2 = ViewCsv.extend({

    _setKeys: function () {
        var self = this;

        var groups = {};

        console.log('LOADFIELDS:' , self.config.load_fields_type);
        console.log('SAVEFIELDS:' , self.config.save_fields_type);
        console.log('FIELDS:' , self.config.fields_type);
        console.log('ORIGFIELDS:' , self.origFieldsType);

            switch (self.currentPhase) {
                case self.phases[self.loadPhase]:
                    groups = self.config.load_groups ? self.config.load_groups :
                        ( self.config.groups ? self.config.groups : {});

                    console.log("load fields_type length: ", self.config.load_fields_type.length);
                    if (self.config.load_fields_type) {
                        self.config.fields_type = self.config.load_fields_type;
                    } else {
                        self.config.fields_type = self.origFieldsType;
                    }
                    break;
                case self.phases[self.savePhase]:

                    groups = self.config.save_groups ? self.config.save_groups :
                        ( self.config.groups ? self.config.groups : {});
                    if (self.config.save_fields_type) {
                        self.config.fields_type = self.config.save_fields_type;
                    } else {
                        self.config.fields_type = self.origFieldsType;
                    }

                    break;
            }

        console.log("fields_type: ", self.config.fields_type);
        if  (Object.keys(groups).length > 0)
        {
            self.keys = [];
            for (var g in groups) {
                for (var f in groups[g].fields) {
                    self.keys.push(groups[g].fields[f]);
                }
            }

            console.log('KEYSSSS: ',self.keys);
            return;
        }

        // self.super();
    },

    _renderElement: function (key) {
        var self = this;

        // caso speciale per gli hidden che non hanno struttura html
        var type = self.config.fields_type[key] ? self.config.fields_type[key].type : 'input';
        if (type == 'input' && self.config.fields_type[key] && self.config.fields_type[key].inputType=="hidden") {
            console.log('CSV HIDDENT');
            var container = $.createDynamicContainer();
            var r = self._createRender(container, key);
            r.render();
            self.jQe.find('[data-hidden_fields]').append(container.html());
            r.container = self.jQe.find('[data-hidden_fields]');
            container.remove();
            return;
        }
        var structure = self._getDefaultStructure(key); //self.config.labels?self.config.labels:'left';
        var container = $.createDynamicContainer('#' + self.prefixTemplateClass + '_' + structure + '_view_edit_tpl');
        var safeKey = key.replace(/[\])}\[{(]/g, '');
        $(container.first().children()[0]).addClass('view-field-'+safeKey);
        container.find('.' + type + '-field').addClass('field-' + safeKey + ' ' + self.modelName + '-field-' + safeKey);
        self._translateItem(container, safeKey);
        if (self.langs.length > 1) {
            var imgLang = self._langField(self.config, key);
            self._renderImgLang(container, imgLang);
        }
        container.find('[data-field_value]').attr('data-field_value', key);
        //console.log(container.html());
        var group = self._getGroup(key);
        self.jQe.find('[data-view_elements="' + self.modelName + '"]').find('[data-group="' + group + '"]').append(container.html());
        //self.jQe.find('[data-view_elements="' + self.modelName + '"]').append(container.html());
        container.remove();
        var realContainer = self.jQe.find('[data-view_elements="' + self.modelName + '"]').find('[data-field_value="' + key + '"]');


        var r = self._createRender(realContainer, key);
        r.render();
    },
    _getGroup: function (key) {
        var self = this;
        var group = 'g0';

        var groups = {};
        switch (self.currentPhase) {
            case self.phases[self.loadPhase]:
                groups = self.config.load_groups ? self.config.load_groups :
                    ( self.config.groups ? self.config.groups : {});
                break;
            case self.phases[self.savePhase]:

                groups = self.config.save_groups ? self.config.save_groups :
                    ( self.config.groups ? self.config.groups : {});
                break;
        }

        for (var g in groups) {
            if ($.inArray(key, groups[g].fields) >= 0)
                return g;
        }
        return group;
    }

});


var ViewCsvData = ViewList.extend({
    init: function (modelName, data, config) {
        this._super(modelName, data, config);
        this.type = 'list';
        this.defaultRenderType = 'text';
        this.routeType = 'datacsv';
    },
    _renderHeaderActions: function (jQrow) {
        var self = this;

        if (!self.data.has_errors) {
            self.config.actions = _.difference(self.config.actions, ['actionCsvShowAll', 'actionCsvShowError']);
        }
        self._super(jQrow);
    },

    _finalizeRow: function (index) {
        var self = this;
        self._super(index);


        // aggiungo il tastino error    
        var errorKeys = {};
        for (var i in self.data.value[index].errors) {
            var k = self.data.value[index].errors[i].field_name;
            if (!errorKeys[k]) {
                errorKeys[k] = [];
            }
            errorKeys[k].push(self.data.value[index].errors[i]);
        }
        //console.log("keyssss",errorKeys);
        for (var key in self.data.value[index]) {

            if (errorKeys[key]) {
                var errorData = {
                    value: self.data.value[index][key],
                    errors: errorKeys[key]
                };
                var container = self.renderObjs[index][key].container;
                var tpl = $.getTemplate('#error_tpl', {});
                $(container).append(tpl);
                self._renderError(key, errorData, container, index);


            }
        }
    },
    _renderError: function (key, errorData, container, index) {
        var self = this;

        $(container).find('[data-error]').data('error', errorData);
        if (self.config.error_type[key] && self.config.error_type[key].readonly) {
            $(container).find('[data-bt_error]').addClass('hide');
            var errorHtml = '';
            for (var i in errorData.errors) {
                errorHtml += $.translate('validation-' + Utility.lowerCase(errorData.errors[i].error_name)) + '<br/>';
            }
            $(container).find('[data-error_text]').html(errorHtml);
            return;
        }
//console.log("ERROR TYPE",self.config.error_type);

        $(container).find('[data-bt_error]').click(function () {
            var errorData = $(this).data('error');
            var policy = 'text';
            if (self.config.error_type[key] && self.config.error_type[key].fix_policy)
                policy = self.config.error_type[key].fix_policy.type;

            switch (policy) {
                case 'text':
                    self._createTextFix(errorData);
                    break;
                case 'select':
                    errorData.domainValues = self.config.error_type[key].fix_policy.domainValues ?
                        self.config.error_type[key].fix_policy.domainValues : {};
                    errorData.domainValuesOrder = self.config.error_type[key].fix_policy.domainValuesOrder ?
                        self.config.error_type[key].fix_policy.domainValuesOrder : [];
                    self._createSelectFix(errorData);
                    break;
                case 'autocomplete':
                    break;
                case 'insert':
                    break;
                default:
                    if ($.isFunction(self.config[policy+'Fix'])) {
                        self.config[policy + 'Fix'].apply(self,[errorData, index]);
                    } else {
                        throw "policy " + policy + "not yet implemented";
                    }
                    return;
            }


        });
    },


    // _renderError: function (key, errorData, container, index) {
    //     var self = this;
    //
    //     $(container).find('[data-error]').data('error', errorData);
    //     if (self.config.error_type[key] && self.config.error_type[key].readonly) {
    //         $(container).find('[data-bt_error]').addClass('hide');
    //         $(container).find('[data-error_text]').html($.translate('validation-' + Utility.lowerCase(errorData.errors[0].error_name)))
    //         return;
    //     }
    //     //console.log("ERROR TYPE",self.config.error_type);
    //
    //     $(container).find('[data-bt_error]').click(function () {
    //         var errorData = $(this).data('error');
    //         var policy = 'text';
    //         if (self.config.error_type[key] && self.config.error_type[key].fix_policy)
    //             policy = self.config.error_type[key].fix_policy.type;
    //
    //         switch (policy) {
    //             case 'text':
    //                 self._createTextFix(errorData);
    //                 break;
    //             case 'select':
    //                 errorData.domainValues = self.config.error_type[key].fix_policy.domainValues ?
    //                     self.config.error_type[key].fix_policy.domainValues : {};
    //                 errorData.domainValuesOrder = self.config.error_type[key].fix_policy.domainValuesOrder ?
    //                     self.config.error_type[key].fix_policy.domainValuesOrder : [];
    //                 self._createSelectFix(errorData);
    //                 break;
    //             case 'autocomplete':
    //                 break;
    //             case 'insert':
    //                 break;
    //             default:
    //                 if ($.isFunction(self.config[policy+'Fix'])) {
    //                     self.config[policy + 'Fix'].apply(self,[errorData, index]);
    //                 } else {
    //                     throw "policy " + policy + "not yet implemented";
    //                 }
    //                 return;
    //         }
    //
    //
    //     });
    // },

    _createTextFix: function (errorData) {
        var self = this;
        var _controller = self._controller;
        var model = self.modelName;
        // creo la form degli errori con il primo errore che trovo.
        errorData.errorForm = self._createFormErrorData(errorData.errors[0]);
        errorData.errors[0].error_label = $.translate('validation-' + Utility.lowerCase(errorData.errors[0].error_name));
        console.log('errorData', errorData, model);
        var tplError = $.getTemplate('#error_dialogcontent_tpl', errorData);
        $.generalDialog(tplError, {
            btok_label: 'Salva',
            btcancel_label: 'Annulla',
            title: 'Correggi errore'
        }).ok(function () {
            var data = $('#generalDialog').find('form').serializeAssoc();
            data[data.field_name] = data.value;
            data.id = data.csv_table_id;
            _controller.fixCsvError(model, data, function (json) {
                if (json.error) {
                    $.errorDialog(json.msg);
                    return;
                }
                _controller.reload(self.keyId);
            });
        });
    },

    _createSelectFix: function (errorData) {
        var self = this;
        var _controller = self._controller;
        var model = self.modelName;
        // creo la form degli errori con il primo errore che trovo.
        errorData.errorForm = self._createFormErrorData(errorData.errors[0]);
        errorData.errors[0].error_label = $.translate('validation-' + Utility.lowerCase(errorData.errors[0].error_name));
        console.log('errorData', errorData, model);
        var tplError = $.getTemplate('#error_dialogcontent_select_tpl', errorData);
        $.generalDialog(tplError, {
            btok_label: 'Salva',
            btcancel_label: 'Annulla',
            title: 'Correggi errore'
        }).ok(function () {
            var data = $('#generalDialog').find('form').serializeAssoc();
            data[data.field_name] = data.value;
            data.id = data.csv_table_id;
            _controller.fixCsvError(model, data, function (json) {
                if (json.error) {
                    $.errorDialog(json.msg);
                    return;
                }
                _controller.reload(self.keyId);
            });
        });
    },

    _createFormErrorData: function (error) {
        var errorForm = [];
        for (var k in error) {
            if (k != 'value')
                errorForm.push({key: k, value: error[k]});
        }
        return errorForm;
    }

});
/**
 * VERSIONE LIBRERIA 3
 */
/**
 * base class contoller model
 */
var CoreController = Class.extend({
    type: null,
    _supportedViewTypes: ['list', 'search', 'edit', 'view', 'calendar', 'csv'],
    _standarViewClass: {
        'ViewList': 'list',
        'ViewEdit': 'edit',
        'ViewSearch': 'search',
        'ViewView': 'edit',
        'ViewCsv': 'csv'
    },
    _defaultConfs: {
        'list': ListConfs,
        'edit': EditConfs,
        'search': SearchConfs,
        'calendar': CalendarConfs,
        'csv': CsvConfs
    },
    _viewCounter: 0,            // contatore per la generazione delle chiavi di view univoca

    _viewConfig: {},       // vettore contenente le view e le loro configurazioni
    /**
     configurazione tipo
     viewConfig =  {
            view : view,
            params : params,
            query_params : {},
            post_params : {},
            routeType : value,
            connected_view {
                actionName : [
                    {
                        key : value ,
                        action : value
                    }
                ]
            }
        }
     */
    constraintKey: null,
    constraintValue: null,
    modelName: null,
    options: {},
    json: {},
    afterLoadedData: {},  // funzioni da chiamare dopo il caricamento dei dati la chiave modello -> routeType -> function

    init: function () {
        this._viewCounter = 0;
        this._viewConfig = {};
    },

    /**
     * aggiunge una view al controller
     * viewClass : tipo di view, se e' di quelle standard, non serve il type
     * params :  vettore associativo opzionale
     {
         modelName : nome modello dati
         type : tipo di view definite in _standarViewClass
 *       config : configurazione view
 *       data : dati della lista,
         container: container
     }
     */
    addView: function (viewClass, params) {
        var self = this;
        log.debug('CoreController.addView', viewClass, params);
        if (!params.modelName)
            throw 'Invalid model Name';
        if (!window[viewClass])
            throw 'View Class name ' + viewClass + ' not definited!';
        var view = new window[viewClass](params.modelName);
        if (!view.type || $.inArray(view.type, self._supportedViewTypes) < 0)
            throw 'view type ' + view.type + ' not supported';


        if (params.config)
            view.setConfig(params.config);
        else {
            view.setConfig(new self._defaultConfs[view.type]());
        }
        view.setController(self);

        //view.config = params.config?params.config: new self._defaultConfs[view.type]();
        var viewKey = 'v' + self._viewCounter;
        view.keyId = viewKey;
        log.debug("constraint ", params.constraint);
        self._viewConfig[viewKey] = {
            view: view,
            params: params,
            query_params: params.config.query_params ? params.config.query_params : {},
            post_params: {},
            connected_view: {},
            routeType: params.routeType ? params.routeType : view.type,
            constraint: params.constraint ? params.constraint : ''
        };
        log.debug('addView ' + viewKey, self._viewConfig[viewKey]);
        self._viewCounter++;
        return viewKey;
    },
    removeView: function (key) {
        var self = this;
        try {
            if (!self._viewConfig[key])
                return;
            delete self._viewConfig[key].view;
            delete self._viewConfig[key];
        } catch (e) {
            log.error(e);
        }
    },
    removeAllViews: function () {
        var self = this;
        for (var k in self._viewConfig) {
            self.removeView(k);
        }
        delete self._viewConfig;
        self._viewConfig = {};
    },
    connectView: function (key, connectionView) {
        var self = this;
        var action = connectionView.action;
        if (!self._viewConfig[key]['connected_view'][action])
            self._viewConfig[key]['connected_view'][action] = [];
        self._viewConfig[key]['connected_view'][action].push(connectionView);
    },
    renderViews: function () {
        var self = this;
        for (var key in self._viewConfig) {
            self.renderView(key);
        }
    },

    renderView: function (key, callback) {
        var self = this;
        var view = self._viewConfig[key].view;
        var __render = function () {
            view.render();
            view.afterRender();
            self.connectActions(key);
            self._setValidationRules(key);
            if (callback) {
                callback();
            } else if (view.config.finalizeCallback) {
                view.config.finalizeCallback.apply(view);
            }
        }
        if (!view.data || Object.keys(view.data) == 0) {
            self._loadData(key, function (json) {
                if (json.error) {
                    $.errorDialog(json.msg);
                    return;
                }
                self.setJsonDataToView(key, json);
                view.afterLoadData();
                __render();
            })
        } else {
            __render();
            /*
             view.render();
             self.connectActions(key);
             self._setValidationRules(key);
             callback();
             */
        }
    },

    setJsonDataToView: function (key, json) {
        var self = this;
        var view = self._viewConfig[key].view;
        var data = {};
        $.langDefs = $.extend(true,json.translations,$.langDefs);
        // check di callback dopo il caricamento dati
        if (self.afterLoadedData[key]) {
            self.afterLoadedData[key](json);
        }
        var resultType = Routes[view.routeType].resultType;
        var protocol = new window[Utility.pascalCase(resultType + '_protocol')]();
        protocol.jsonToData(json);
        view.setData(protocol);
        /*
        if (view.type == 'list') {
            data.value = json.result.data;
            data.metadata = json.metadata;
            data.pagination = _.omit(json.result, ['data','has_errors']);
            data.resultParams = json.resultParams;
            data.validationRules = json.validationRules;
            data.backParams = json.backParams;
            data.has_errors = (json.result.has_errors == true);
        } else {
            data.value = json.result;
            data.metadata = json.metadata;
            data.pagination = null;
            data.resultParams = json.resultParams;
            data.validationRules = json.validationRules;
            data.backParams = json.backParams;
        }
        view.setData(data);
        */
    },

    setConfigToView: function (key, config) {
        var self = this;
        self.getView(key).setConfig(config);
    },

    getViewConfig: function (key) {
        return this._viewConfig[key];
    },
    /**
     * ritorna la conf per eseguire la richiesta ajax per caricare i dati
     * associati alla vista
     */
    _getAjaxConf: function (key) {
        var self = this;
        var viewConf = self._viewConfig[key];
        var aConf = {
            url: null,
            query_params: viewConf.query_params ? viewConf.query_params : {},
            method: null,
            post_params: viewConf.post_params ? viewConf.post_params : {}
        };
        console.log('_getAjaxConf', viewConf.view.routeType, 'viewConf', viewConf);
        // TODO convergere alla urlParams obbligatori
        //var urlType = viewConf.view.routeType;
        var urlType = viewConf.routeType + viewConf.constraint;
        if (viewConf.params.routeParams) {
            aConf.url = Routes.getUrlInstance(urlType, viewConf.params.routeParams);
            aConf.method = Routes[urlType].method;
            return aConf;
        }

        throw 'routeParams not found';
    },
    /**
     * ritorna la conf per eseguire la richiesta ajax per spedire i dati
     * associati alla vista
     * @param key : chiave interna univoca per prendere la configurazione della view
     */
    _sendAjaxConf: function (key) {
        var self = this;
        var viewConf = self._viewConfig[key];
        /*
         var urlValues = {
         model:viewConf.params.modelName,
         };
         */
        var urlType = viewConf.view.type;

        post_params = self._viewConfig[key].post_params ? self._viewConfig[key].post_params : {};
        if (viewConf.view.type == 'edit') {
            if (self._viewConfig[key].params.pk) {
                urlType = 'save' + viewConf.constraint;
                /*
                 var urlValues = {
                 model:self._viewConfig[key].params.modelName,
                 pk : self._viewConfig[key].params.pk
                 }
                 */
                post_params._method = 'PUT';
            } else {
                urlType = 'create' + viewConf.constraint;
                post_params._method = 'POST';
            }
        }
        log.debug('_sendAjaxConf', urlType);
        var sConf = {
            //url : Routes.getUrlInstance(urlType,urlValues),
            url: Routes.getUrlInstance(urlType, viewConf.params.routeParams),
            query_params: self._viewConfig[key].query_params ? self._viewConfig[key].query_params : {},
            method: Routes[urlType].method,
            post_params: post_params
        };
        return sConf;
    },

    /**
     * carica i dati per view di id key.
     * in caso di callback restituisce i dati ricevuti alla callback
     * @param key : id della view
     * @param callback : eventuale callback a cui ritornare i dati
     **/
    _loadData: function (key, callback) {
        var self = this;
        callback = callback ? callback : function (json) {
                if (json.error) {
                    $.errorDialog(json.msg);
                    return;
                }
            };
        var ajaxConf = self._getAjaxConf(key);
        //log.debug('ajaxConf',ajaxConf);
        var url = ajaxConf.url;
        if (ajaxConf.method == $.get) {
            params = ajaxConf.query_params;
        } else {
            url += "?" + ajaxConf.query_params;
            params = ajaxConf.post_params;
        }
        self._executeRequest(ajaxConf, callback)
    },

    _sendData: function (key, data, callback) {
        var self = this;
        callbackLocal = callback ? callback : function (json) {
                if (json.error) {
                    $.errorDialog(json.msg);
                    return;
                }
            };
        var sendConf = self._sendAjaxConf(key);

        var postData = $.extend(true, sendConf.post_params, data);
        //var postData = data;
        sendConf.post_params = postData;
        self._executeRequest(sendConf, callbackLocal);
    },
    /**
     * esegue la richiesta ajax utilizzando l'oggetto confRequest,
     * @params confRequest di tipo Routes [type]
     * @params callback chiamata di ritorno
     */
    _executeRequest: function (confRequest, callback) {
        var self = this;
        log.debug('_executeRequest', confRequest);
        // in caso di get i post params non li devo mandare altrimenti li mette in get e non va bene
        var post_params = confRequest.method == $.get ? {} : confRequest.post_params;

        //confRequest.method(confRequest.url+'?'+jQuery.param( confRequest.query_params ),confRequest.post_params,function (json) {
        confRequest.method(Facade.getUrl(confRequest.url) + '?' + jQuery.param(confRequest.query_params), post_params, function (json) {
            callback(json);
        }).fail(function (f) {
            var tmpJson = {error: 1, msg: $.getFailMessage(f)}
            callback(tmpJson);
            return
        })
    },
    /**
     * connetto le azione della view con chiave key
     * @param key : chiave univoca della view. In caso di chiave view vuota le action vengono
     * considerate globali non associate ad una view
     * @param selector : default null, eventuale selector in caso di azioni generali non associate ad una
     * view
     **/
    connectActions: function (key, selector) {
        var self = this;
        if (!key && !selector) {
            throw "Controller.connectActions invalid key and selector"
        }
        var view = self._viewConfig[key] ? self._viewConfig[key].view : null;
        var selector = view ? view.config.container : selector;
        log.info("connectionAction", key, $(selector));
        $.each($(selector).find("[data-action]"), function () {
            // controllo che non abbia la classe disabled. in quel caso non aggancio nulla

            if ($(this).hasClass('disabled'))
                return;

            var actionName = $(this).data("action");
            var pk = $(this).data("pk") ? $(this).data("pk") : null;
            var params = $(this).data("params") ? $(this).data("params") : {};
            if ($(this).is('input') || $(this).is('select')) {
                //log.info("found action [" + action + "] on " + $(this).prop('tagName'))
                $(this).unbind('change');
                $(this).change(function () {
                    pk = $(this).val();
                    self._executeAction(key, actionName, pk, params);
                    // self[action](key,pk,params);
                });
            } else {
                $(this).unbind('click');
                $(this).click(function () {
                    self._executeAction(key, actionName, pk, params);
                    //self[action](key,pk,params);
                });
            }

        });
        self._connectEvents(key);
        // intercetto eventi che possono essere azioni


    },
    _connectEvents: function (key) {
        var self = this;
        // in caso di key non valorizzata non si esegue la sezione events
        if (!key)
            return;
        var view = self._viewConfig[key].view;

        view.fireEvent = function (evt) {
            var view = self._viewConfig[key].view;
            log.debug("Controller get Event ", key, evt);

            var method = '_connectEvent'+Utility.pascalCase(evt.type);

            if (_.isFunction(self[method])) {
                self[method](evt, view);
            }


        }
    },

    _connectEventSwap: function (evt, view) {

        self = this;
        var actionParams = {
            field: evt.key,
            value: evt.params
        }
        self._executeAction(view.keyId, 'set', evt.pk, actionParams);


    },

    _connectEventMap: function (evt, view) {
        for (var k in evt.params) {
            view.setRenderData(k, evt.params[k]);
        }
    },

    _executeAction: function (key, actionName, pk, params) {
        var self = this;
        log.debug("_executeAction", key, actionName, pk, params);
        if (!key) {
            throw "Controller._executeAction key not valid";
        }
        var view = self._viewConfig[key].view;
        var custom = view.config.extra_actions ? view.config.extra_actions[actionName] : null;
        // check se la funzione e' stata definita nelle extra actions della view
        if (custom) {
            log.debug('found custom action ', custom, params);
            var validParams = params;
            if (!$.isArray(params) && !$.isPlainObject(params))
                validParams = [params];

            if (_.isFunction(custom.func)) {
                var f = view.config.extra_actions[actionName];
                f.view = view;
                return view.config.extra_actions[actionName].func.apply(f, _.values(validParams));
            }
            log.warn('custom.func not defined');
            return;
        }

        // se c'e' una funzione creata nel controller eseguo quella per prima
        if (_.isFunction(self[actionName])) {
            log.debug('found controller action ', custom, params);
            self[actionName].view = view;
            return self[actionName](key, pk, params);
        }

        throw "Controller." + actionName + " not implemented";
    },

    getView: function (key) {
        return this._viewConfig[key].view;
    },

    _setValidationRules: function (key) {

        var self = this;
        var view = self._viewConfig[key].view;
        var form = $(view.config.container).find('form');
        if (form.length == 0)
            return;
        var form_rules = {};
        for (var key in view.data.validationRules) {
            log.info("Validation rule key " + key);
            var element_rules = {};
            var rule_string = view.data.validationRules[key];
            var rules = rule_string ? rule_string.split("|") : [];
            for (var i in rules) {
                var rule = rules[i];
                try {

                    //var tmp = rule.split(":");
                    var rule_name = rule.split(":").length > 0 ? rule.split(":")[0] : rule;
                    rule_name = 'V' + rule_name;

                    if (window[rule_name]) {
                        // caso speciale
                        if (rule_name == "Vsometimes") {
                            var other_rules = _.clone(rules);
                            other_rules.splice(0, 1);

                            var r = new window[rule_name](form);
                            element_rules = $.extend(element_rules, r.get(key, other_rules));
                            break;
                        }
                        var r = new window[rule_name](form);
                        element_rules = $.extend(element_rules, r.get(key, rule));
                    } else {
                        log.warn(rule_name + " non implementata");
                    }
                    //var r = (tmp.length > 0) ? new window['V'+tmp[0]](form): new window['V'+rule](form);
                    //element_rules = $.extend(element_rules,r.get(key,rule));
                } catch (e) {
                    log.error(e);
                }
            }
            form_rules[key] = element_rules;
        }
        //console.log(form_rules);
        form.validate({
            rules: form_rules
        });
    }
});


/**
 * VERSIONE LIBRERIA 3
 *
 * estende il core controller con le azioni di default di tutta la libreria
 */
var Controller = CoreController.extend({
    jobId : null,
    listKey : null,
    errorListKey : null,
    serachKey : null,
    csvLoaded : false,
    csvSaved : false,
    loadcsvMessage : 'Validazione e precaricamento dei dati del csv',
    savecsvMessage : 'Salvataggio di dati caricati',
    uploadForm : null,
    dataForm : null,
    hasErrors : false,
    errors : [],
    iszip : false,
    mainViewKey : null,

    /**
    *
    * ---------------------------
    * azioni connesse con le varie view attraverso la ricerca di tutti i controlli che hanno
    * l'attributo data-action
    * ----------------------------
    *
    **/
    _reset : function () {
        var self = this;
        self.csvLoaded = false;
        self.csvSaved = false;
        //TODO refresh controlli form

    },
    actionAddCsv: function (key) {
        var self = this;
        log.debug('addCsv',key);
        /*
         * risposta in load
         * durante la load
         * {
         *  rows : [] , //righe caricates
         *  current_row : 0,
         *  errors : [{
         *      row : int,
         *      col : int,
         *      errors : [
         *          {key : descrizione},
         *      ]
         *  }]
         */
        var vConf = self._viewConfig[key];
        var view = self.getView(key);
        if (!view.fileName) {
            $.errorDialog('Devi prima caricare un file dati');
            return ;
        }
        var postData = view.getFormData();
        $.confirmDialog('Questa operazione potrebbe richiedere minuti, continuare?').ok(function () {
            $.waitStart();
            if (self.listKey) {
                delete self.listKey;
            }
            if (self.errorListKey)
                delete self.errorListKey;
            var confRequest = {
                url : Routes.getUrlInstance('addcsv',{}),
                query_params : vConf.query_params?vConf.query_params:{},
                method : Routes.addcsv.method,
                post_params : postData
            };
            self._executeRequest(confRequest,function (json) {
                $.waitEnd();
                if (json.error) {
                    $.errorDialog(json.msg);
                    return ;
                }
                self.getView(key).showProgress(self.loadcsvMessage);
                //$.progressDialog(self.loadcsvMessage);
                self.jobId = json.jobId;
                view.setLoadId(json.jobId);
                //self.dataForm.find('input[name="csv_load_id"]').val(json.jobId);
                $.waitStart();
                self.statusCsv(key);
            });
        });

        return ;

    },
    statusCsv : function (key) {
        var self = this;
        var vConf = self._viewConfig[key];
        var confRequest = {
            url : Routes.getUrlInstance('statuscsv',{jobId:self.jobId}),
            query_params : vConf.query_params?vConf.query_params:{},
            method : Routes['statuscsv'].method,
            post_params : {}
        }
        self._executeRequest(confRequest,function (json) {

            if (json.error) {
                $.waitEnd();
                $.errorDialog(json.msg);
                return ;
            }
            if (json.job.end) {
                self.getView(key).hideProgress();
                $.waitEnd();
                //$.progressDialogClose();
                if (parseInt(json.job.error) ) {
                    $.errorDialog(json.job.msg);
                    return ;
                }
                self.getView(key).goToNextPhase();
                //self.getView(key).currentPhase = self.getView(key).phases[2];

                self.csvLoaded = true;
                self.jobId = 0;
                //$(self.options.container).find('[data-action="savecsv"]').prop("disabled",false);
                $.messageDialog("Precaricamento effettuato");
                self.renderView(key);
                self.actionCsvShowAll(key);
                return ;
            }
            if (json.job.progress) {
                self.getView(key).showProgress(self.loadcsvMessage, json.job.progress);
                //$.progressDialog(self.loadcsvMessage, json.job.progress);
            } else {
                self.getView(key).showProgress(self.loadcsvMessage);
                //$.progressDialog(self.loadcsvMessage);
            }
            setTimeout(function () {
                self.statusCsv(key);
            },3000);
        });


        return ;
    },
    actionCsvCancel : function () {
        window.location.reload();
    },
    actionCsvShowAll : function (key) {
        var self = this;
        var vConf = self._viewConfig[self.mainViewKey];
        self._createSearchForm();
        if (!self.listKey) {
            var listConf = Facade.getConf().getConf(vConf.view.modelName,'csvdata'); // new ListConfs();
            listConf.container = $(vConf.view.config.container).find('[data-csvfiledata]');
            listConf.pagination = true;
            var data = {
                value : null,
                translations : null
            };

            self.listKey = controller.addView('ViewCsvData',{
                config : listConf,
                //container : "#viewList",
                modelName : vConf.view.modelName,
                routeParams : {
                    model : vConf.view.modelName,
                    jobId : vConf.view.loadId
                },
                routeType : 'datacsv'
            });
        }

        self.renderView(self.listKey);
        return ;
    },
    actionCsvShowError : function (key) {
        var self = this;
        var vConf = self._viewConfig[self.mainViewKey];
        if (!self.errorListKey) {
            var listConf = Facade.getConf().getConf(vConf.view.modelName,'csvdata'); // new ListConfs();
            listConf.container = $(vConf.view.config.container).find('[data-csvfiledata]');
            listConf.pagination = true;
            var data = {
                value : null,
                translations : null
            };

            self.errorListKey = controller.addView('ViewCsvData',{
                config : listConf,
                //container : "#viewList",
                modelName : vConf.view.modelName,
                routeParams : {
                    model : vConf.view.modelName,
                    jobId : vConf.view.loadId
                },
                routeType : 'errorcsv'
            });
        }

        self.renderView(self.errorListKey);
        return ;
    },
    actionCsvRevalidate : function(key) {
        var self = this;
        $.waitStart();
        var vConf = self._viewConfig[self.mainViewKey];
        var model = vConf.view.modelName;
        var jobId = self.jobId;
        var confRequest = {
            url : Routes.getUrlInstance('csvrevalidate',{model:model,jobId:vConf.view.loadId}),
            query_params : {},
            method : Routes.csvrevalidate.method,
            post_params : {}
        };
        self._executeRequest(confRequest,function (json) {
            $.waitEnd();
            //if (callback) {
            //    return callback(json);
            //}
            if (json.error) {
                $.errorDialog(json.msg);
                return ;
            }
            self.actionCsvShowAll(key);
        });
    },
    actionSaveCsv: function (key) {
        var self = this;
        log.debug("saveCsv",key);

        var vConf = self._viewConfig[key];
        var view = self.getView(key);
        if (!self.csvLoaded) {
            $.errorDialog("Prima di salvarli, devi precaricare i dati");
            return ;
        }
        var postData = view.getFormData();

        $.confirmDialog("Questa operazione potrebbe richiedere minuti, continuare?").ok(function () {
            $.waitStart();
            var confRequest = {
                url : Routes.getUrlInstance('savecsv',{}),
                query_params : vConf.query_params?vConf.query_params:{},
                method : Routes['savecsv'].method,
                post_params : postData
            }
            self._executeRequest(confRequest,function (json) {
                $.waitEnd();
                if (json.error) {
                    $.errorDialog(json.msg);
                    return ;
                }
                //$.progressDialog(self.savecsvMessage);
                self.getView(key).showProgress(self.savecsvMessage);
                self.jobId = json.jobId;
                //view.setJobId(json.jobId);
                //self.dataForm.find('input[name="csv_load_id"]').val(json.jobId);
                self.saveCsvStatus(key)
            });
        })
    },

    saveCsvStatus : function (key) {

        var self = this;
        if (!self.jobId) {
            $.errorDialog("Nessun job di salvataggio presente");
            return ;
        }

        var vConf = self._viewConfig[key];
        var confRequest = {
            url : Routes.getUrlInstance('statuscsv',{jobId:self.jobId}),
            query_params : vConf.query_params?vConf.query_params:{},
            method : Routes['statuscsv'].method,
            post_params : {}
        }
        self._executeRequest(confRequest,function (json) {
            $.waitEnd();
            if (json.error) {
                $.errorDialog(json.msg);
                return ;
            }
            if (json.job.end) {
                self.getView(key).hideProgress();
                //$.progressDialogClose();
                if (parseInt(json.job.error) ) {
                    $.errorDialog(json.job.msg);
                    return ;
                }
                $.messageDialog("Salvataggio effettuato").ok(function () {
                    $.waitStart();
                    document.location.reload();
                })
                self.csvSaved = true;
                self.jobId = 0;
                return ;
            }
            if (json.job.progress) {
                //$.progressDialog(self.savecsvMessage, json.job.progress);
                self.getView(key).showProgress(self.savecsvMessage, json.job.progress);
            } else {
                //$.progressDialog(self.savecsvMessage);
                self.getView(key).showProgress(self.savecsvMessage);
            }
            setTimeout(function () {
                self.saveCsvStatus(key);
            },3000);
        });
        return;
    },
    actionRecuperaCsv : function (key) {
        var self = this;
        var vConf = self._viewConfig[key];
        var confRequest = {
            url : Routes.getUrlInstance('recuperacsv',{model:vConf.view.modelName}),
            query_params : {},
            method : Routes['recuperacsv'].method,
            post_params : {}
        }
        self._executeRequest(confRequest,function (json) {
            $.waitEnd();
            if (json.error) {
                $.errorDialog(json.msg);
                return ;
            }
            if (json.result.length > 0) {
                var html = $.getTemplate('#recorvery_items_tpl', json.result);
                $.generalDialog(html, {
                    title : 'Recupera csv caricati',
                    btok_label : 'Seleziona',
                    btcancel_label : 'Annulla',
                }).ok(function () {
                    if ($('#generalDialog').find('input[name="csv_id"]:checked').length > 0) {
                        var jobId = $('#generalDialog').find('input[name="csv_id"]:checked').val();
                        self.jobId = jobId;
                        vConf.view.setLoadId(jobId);
                        if (self.listKey) {
                            delete self.listKey;
                        }
                        if (self.errorListKey)
                            delete self.errorListKey;
                        self.actionCsvShowAll(key);
                        self.csvLoaded = true;
                        self.jobId = 0;

                        //alert('checked ' + $('#generalDialog').find('input[name="csv_id"]:checked').val());
                        //self.dataForm.find('input[name="csv_load_id"]').val(jobId).attr('value',jobId);

                        //$(self.options.container).find('[data-action="savecsv"]').prop("disabled",false);

                    }

                });
            } else {
                $.messageDialog('Nessun csv da recuperare');
            }
        });

    },
    fixCsvError : function (model,data,callback) {
        var self = this;
        $.waitStart();
        var confRequest = {
            url : Routes.getUrlInstance('csvrowupdate',{model:model}),
            query_params : {},
            method : Routes.csvrowupdate.method,
            post_params : data
        };
        self._executeRequest(confRequest,function (json) {
            $.waitEnd();
            if (callback) {
                return callback(json);
            }
            if (json.error) {
                $.errorDialog(json.msg);
                return ;
            }
        });
    },

    _createSearchForm : function () {
        var self = this;
        var vConf = self._viewConfig[self.mainViewKey];
        var searchConf = Facade.getConf().getConf(vConf.view.modelName,'search');
        // se esiste una search la istanzio
        if (Object.keys(searchConf.fields).length > 0) {
            if (!self.serachKey) {
                searchConf.container = $(vConf.view.config.container).find('[data-csvsearch]');
                var data = {
                    value : null,
                    translations : null
                };

                var viewClass ="ViewSearch";
                if (searchConf.groups) {
                    searchConf.templateId = '#default_view_search_group2_tpl';
                    viewClass ="ViewSearchG2";
                }
                self.serachKey = controller.addView(viewClass,{
                    config : searchConf,
                    //container : "#viewList",
                    modelName : vConf.view.modelName,
                    routeParams : {
                        model : vConf.view.modelName,
                    },
                    routeType : 'search'
                });
            }
            self.renderView(self.serachKey);
        }
    },
    /**
     * esegue il reload di una view e chiamata la callback se presente alla fine del caricamento
     * @param key : id key della view
     * @param callback : eventuali callback terminazione reload
     */
    reload : function (key,callback) {
        var self = this;
        self._viewConfig[key].view.data = null;
        $.waitStart();
        self.renderView(key, function () {
            $.waitEnd();
            if (callback) callback();
        });
    },
    nextPage: function (key) {
        var self = this;
        var view = self._viewConfig[key].view;
        
        if (view.data.pagination.current_page + 1 <= view.data.pagination.last_page) {
            $.waitStart();
            self._viewConfig[key].query_params.page = view.data.pagination.current_page + 1;
            self._viewConfig[key].query_params.paginateNumber = view.data.pagination.per_page;
            //self._viewConfig[key].query_params['paginateNumber'] = 10; //view.data.pagination.current_page + 1;
            view.data = null;
            self.renderView(key, function () {
                $.waitEnd();
            });
        }
    },

    prevPage: function (key) {
        var self = this;
        var view = self._viewConfig[key].view;
        if (view.data.pagination.current_page -1 > 0) {
            $.waitStart();
            self._viewConfig[key].query_params.page = view.data.pagination.current_page - 1;
            self._viewConfig[key].query_params.paginateNumber = view.data.pagination.per_page;
            //self._viewConfig[key].query_params['paginateNumber'] = 10; //view.data.pagination.current_page + 1;
            view.data = null;
            self.renderView(key, function () {
                $.waitEnd();
            });
        }
    },

    firstPage: function (key) {
        var self = this;
        var view = self._viewConfig[key].view;
        if (view.data.pagination.current_page > 1) {
            $.waitStart();
            //view.renderWait();
            self._viewConfig[key].query_params.page = 1;
            self._viewConfig[key].query_params.paginateNumber = view.data.pagination.per_page;
            //self._viewConfig[key].query_params['paginateNumber'] = 10; //view.data.pagination.current_page + 1;
            view.data = null;
            self.renderView(key, function () {
                $.waitEnd();
            });
        }
    },

    lastPage: function (key) {
        var self = this;
        var view = self._viewConfig[key].view;
        if (view.data.pagination.current_page < view.data.pagination.last_page) {
            $.waitStart();
            self._viewConfig[key].query_params.page = view.data.pagination.last_page;
            self._viewConfig[key].query_params.paginateNumber = view.data.pagination.per_page;
            //self._viewConfig[key].query_params['paginateNumber'] = 10; //view.data.pagination.current_page + 1;
            view.data = null;
            self.renderView(key, function () {
                $.waitEnd();
            });
        }
       
    },

    perPage : function (key,perPage) {
        var self = this;
        console.log("perpage",key,perPage);
        var view = self._viewConfig[key].view;
        $.waitStart();
        self._viewConfig[key].query_params.page = 1;
        self._viewConfig[key].query_params.paginateNumber = perPage;
        //self._viewConfig[key].query_params['paginateNumber'] = 10; //view.data.pagination.current_page + 1;
        view.data = null;
        self.renderView(key, function () {
            $.waitEnd();
        });

    },



    actionSave : function (key,pk,params,callback) {
        var self = this;
        var vConf = self._viewConfig[key];
        //vConf.post_params = {};
        vConf.post_params = {
            _method : vConf.post_params._method
        };
        var postData = vConf.view.getFormData();
        //log.info('formData', postData);
        $.waitStart();
        self._sendData(key,postData,function (json) {
            $.waitEnd();
            if (json.error && !callback) {
                $.errorDialog(json.msg);
                return ;
            }
            if (callback)
                return callback(json);

            $.messageDialog('Salvataggio avvenuto con successo').ok(function () {

                //vConf.view.successMsg(json.msg);
                //if (callback)
                //    callback(json);
                //else {
                    vConf.view.setData(null);
                    self.renderView(key);
                //}
            });
            
        });
    },

    actionSaveBack : function (key,pk,params,callback) {
        var self = this;
        var _cb = callback?callback:function (json) {
            if (json.error) {
                $.errorDialog(json.msg);
                return ;
            }
            $.messageDialog('Salvataggio avvenuto con successo').ok(function () {
                window.history.back();
            });
        }
        self.actionSave(key,pk,params,_cb);
    },

    actionSearch: function (key) {
        var self = this;

        var view = self._viewConfig[key].view;
        var params = view.getParams();
        var connectedView = self._viewConfig[key].connected_view.search;
        if( !connectedView || connectedView.length === 0) {
            params.page = 1;
            window.location.href = window.location.origin + Facade.getUrl(window.location.pathname + '?' + $.param(params));
            return ;

            //document.location.href = Facade.getUrl("/list/" + view.modelName + "?"+ $.param(params));
            //return ;
        }
        for (var i in connectedView) {
            var connectionView = connectedView[i];
            var vConf = self._viewConfig[connectionView.key];
            vConf.view.renderWait();
            vConf.query_params = params; //_.extend(vConf.query_params,params);
            vConf.query_params.page = 1;

            vConf.view.setData(null);
            self.renderView(connectionView.key);
        }
    },
    /**
     * resetta tutti i valori dei campi che non sono operatori.
     * per ora usata solo nella search
     * @param key
     */
    actionReset: function (key) {
        var self = this;
        var vConf = self._viewConfig[key];
        //TODO operazione di reset per le select e check
        var itemNone = window.ItemNoneValue ? window.ItemNoneValue : '';
        $(vConf.view.config.container).find('input:not([data-control_operator])').attr('value','').prop('value','').val('');
        $(vConf.view.config.container).find('select').attr('value',itemNone).prop('value',itemNone).val(itemNone);
        self.actionSearch(key);
    },

    actionReload : function (key) {
        var self = this;
        self.reload(key);
        /*
        var vConf = self._viewConfig[key];
        //TODO operazione di reset per le select e check
        $(vConf.view.config.container).find('input:not([data-control_operator])').attr('value','').prop('value','').val('');
        self.actionSearch(key);
        */
    },
    actionEdit : function (key,pk) {
        var self = this;
        var view = self._viewConfig[key].view;
        var connectedView = self._viewConfig[key].connected_view.edit;
        if( !connectedView || connectedView.length === 0) {
            var constraintSuffix = '';
            if (view.config.constraint) {
                constraintSuffix = '/' + view.config.constraintKey + '/' + view.config.constraintValue;
            }
            document.location.href=Facade.getUrl('/edit/' + view.modelName + '/' + pk + constraintSuffix);
            return ;
        }

        for (var i in connectedView) {
            var connectionView = connectedView[i];
            var vConf = self._viewConfig[connectionView.key];
            vConf.view.renderWait();
            vConf.params.routeParams.pk = pk;
            vConf.post_params = {};
            vConf.view.routeType = 'edit';
            vConf.routeType = 'edit';

            /*
            if (vConf.params.routeParams.constraintKey) {
                vConf.view.routeType = 'editConstraint';
                vConf.routeType = 'editConstraint';
            } else {
                vConf.view.routeType = 'edit';
                vConf.routeType = 'edit';
            }
            */
            vConf.params.pk  = pk;
            vConf.view.setData(null);
            self.renderView(connectionView.key,function () {
                
            });
        }
    },

    actionDelete: function (key,pk) {
        var self = this;
        var viewConf = self._viewConfig[key];
        var view = viewConf.view;
        $.confirmDialog('Sei sicuro di voler cancellare l\'elemento?').ok(function () {
            
            var urlValues = {
                model:viewConf.params.modelName,
                pk : pk
            };
            var sConf = {
                url : Routes.getUrlInstance('remove',urlValues),
                query_params : {},
                method : Routes.remove.method,
                post_params : {'_method': 'DELETE'}
            };
            $.waitStart();
            self._executeRequest(sConf,function (json) {
                $.waitEnd();
                if (json.error) {
                    $.errorDialog(json.msg);
                    return;
                }
                viewConf.view.renderWait();
                viewConf.view.setData(null);
                self.renderView(key);
            });
        });

    },

    /**
     * carica i dati e mostra la view insert 
     */
    actionInsert : function(key) {
        var self = this;
        log.debug("CoreController.insert called ",key);
        var view = self._viewConfig[key].view;
        var connectedView = self._viewConfig[key].connected_view['showInsert'];
        if( !connectedView || connectedView.length == 0) {
            var constraintSuffix = '';
            if (view.config.constraint) {
                constraintSuffix = '/' + view.config.constraintKey + '/' + view.config.constraintValue;
            }
            document.location.href=Facade.getUrl("/insert/" + view.modelName + constraintSuffix);
            return ;
        }
        for (var i in connectedView) {
            var connectionView = connectedView[i];
            self.insert(connectionView.key);
            /*
            var vConf = self._viewConfig[connectionView.key];
            vConf.view.routeType = 'insert';
            vConf.routeParams.pk = null;
            vConf.view.renderWait();
            vConf.params.pk  = null;
            vConf.view.setData(null);
            self.renderView(connectionView.key,function () {
                
            });
*/
        }
    },

    insert : function(key) {
        var self = this;
        var vConf = self._viewConfig[key];
       /* if (vConf.params.routeParams.constraintKey) {
            vConf.view.routeType = 'insertConstraint';
            vConf.routeType = 'insertConstraint';
        } else {
            vConf.view.routeType = 'insert';
            vConf.routeType = 'insert';
        }*/
        vConf.view.routeType = 'insert';
        vConf.routeType = 'insert';
        vConf.params.routeParams.pk = null;
        vConf.view.renderWait();
        vConf.params.pk  = null;
        vConf.view.setData(null);
        self.renderView(key,function () {
            
        });
        /*
        log.debug("CoreController.insert called ",key);
        var view = self._viewConfig[key].view;
        var connectedView = self._viewConfig[key].connected_view['insert'];
        if( connectedView.length == 0) {
            document.location.href="/insert/" + view.modelName;
            return ;
        }
        for (var i in connectedView) {
            var connectionView = connectedView[i];
            var vConf = self._viewConfig[connectionView.key];
            vConf.view.routeType = 'insert';
            vConf.routeParams.pk = null;
            vConf.view.renderWait();
            vConf.params.pk  = null;
            vConf.view.setData(null);
            self.renderView(connectionView.key,function () {
                
            });
        }
        */
    },


    actionView: function (key,pk) {
        var self = this;
        var view = self._viewConfig[key].view;
        var connectedView = self._viewConfig[key].connected_view['view'];
        if( !connectedView || connectedView.length == 0) {
            var constraintSuffix = '';
            if (view.config.constraint) {
                constraintSuffix = '/' + view.config.constraintKey + '/' + view.config.constraintValue;
            }
            document.location.href=Facade.getUrl("/view/" + view.modelName + "/" + pk + constraintSuffix);
            return ;
        }

        for (var i in connectedView) {
            var connectionView = connectedView[i];
            var vConf = self._viewConfig[connectionView.key];
            vConf.view.renderWait();
            vConf.routeType = 'view';
            vConf.view.routeType = 'view';
            vConf.params.routeParams.pk = pk;
            vConf.params.pk  = pk;
            vConf.view.setData(null);
            self.renderView(connectionView.key,function () {
                
            });
        }
    },
    set : function (key,pk,params) {
        var self = this;
        console.log('action set',key,pk,params);
        var viewConf = self._viewConfig[key];
        var urlValues = {
            model:viewConf.params.modelName,
            field : params.field,
            value : params.value
        };
        var urlType = viewConf.view.type;

        var sConf = {
            url : Routes.getUrlInstance('set',urlValues),
            query_params : {},
            method : Routes.set.method,
            post_params : {id : pk}
        };
        $.waitStart();
        self._executeRequest(sConf,function (json) {
            $.waitEnd();
            if (json.error) {
                $.errorDialog(json.msg);
                return;
            }
            viewConf.view.setData(null);
            self.renderView(key);
            // TODO fare il reload della view?
        });
    },

    order: function (key,pk) {
        var self = this;
        //console.log('key ' + key + " pk " + pk,self._viewConfig[key]);
        var vConf = self._viewConfig[key];

        var order_field = vConf.view.data.resultParams.order_field;
        var order_direction = vConf.view.data.resultParams.order_direction;
        if (order_field == pk) {
            order_direction = order_direction=='ASC'?'DESC':'ASC';
        } else {
            order_field = pk;
            order_direction = 'ASC';
        }
        vConf.query_params.order_field = order_field;
        vConf.query_params.order_direction = order_direction;

        vConf.view.renderWait();
            //vConf.params.pk  = pk;
        vConf.view.setData(null);
        self.renderView(key,function () {
                
        });
    },
    actionDeleteAll : function (key) {
        var self  =this;
        var viewConf = self._viewConfig[key];
        var checked = viewConf.view.getChecked();
        if (checked.length === 0)
            return ;
        $.confirmDialog('Sei sicuro di voler cancellare gli elementi selezionati?').ok(function () {
            var urlValues = {
                model:viewConf.params.modelName,
            };
            var sConf = {
                url : Routes.getUrlInstance('removeAll',urlValues),
                query_params : {},
                method : Routes.remove.method,
                post_params : {'ids': checked}
            };
            $.waitStart();
            self._executeRequest(sConf,function (json) {
                $.waitEnd();
                if (json.error) {
                    $.errorDialog(json.msg);
                    return;
                }
                viewConf.view.renderWait();
                viewConf.view.setData(null);
                self.renderView(key);
            });
        });
    },

    actionBack : function () {
        window.history.back();
    },


    /**
    * esegue una richiesta ajax manuale tra quelle definite nell'oggetto Route
    * @param routeType : tipo di route da usare
    * @param routeParams : vettore associativo dei parametri per istanziare la route
    * @param params : opzionale, vettore associativo per i parametri in get e in post 
    * @param callback : eventuale callaback a cui dare il risultato
    */
    execute : function (routeType,routeParams,params,callback) {
        var self = this;

        var sConf = {
            url : Routes.getUrlInstance(routeType,routeParams),
            query_params : (params && params.query_params)?params.query_params:{},
            method : Routes[routeType].method,
            post_params : (params && params.post_params)?params.post_params:{}
        };
        var cb = callback?callback:function () {};
        $.waitStart();
        self._executeRequest(sConf,function (json) {
            $.waitEnd();
            cb(json);
        });


        // var url = Routes.getUrlInstance(routeType,routeParams);
        // var qParams = (params && params.query_params)?'?'+jQuery.param( confRequest.params ):'';
        // var pParams = (params && params.post_params)?params.post_params:{};
        // var cb = callback?callback:function () {};
        // log.debug('execute',url,qParams,pParams);
        // Routes[routeType].method(url+qParams,pParams,function (json) {
        //     return cb(json);
        // }).fail(function (f) {
        //     var tmpJson = {error : 1, msg : $.getFailMessage(f)};
        //     return cb(tmpJson);
        // });
    },
    waitQueueJob : function (jobId,callback) {
        var self = this;
        self.execute('queueStatus',{jobId:jobId},{},function (json) {
            if (json.error) {
                if (callback) {
                    callback(json);
                } else {
                    $.errorDialog(json.msg);
                }
                return ;
            }
            if (json.job.end) {
                if (callback) {
                    callback(json);
                } else {
                    if (json.job.error) {
                        $.errorDialog(json.job.msg);
                    }
                }
                return ;
            }

            setTimeout(function (jobId) {
                self.waitQueueJob(jobId,callback);
            },2000);
        })
    }
});
var ListConfs = Class.extend({
    actions : ['actionDelete','actionDeleteAll','actionEdit','actionView','actionInsert'],
    extra_actions : {},
    fields : [],
    detail_fields: {},
    fields_type: {
        id :            {type:'input','inputType': 'hidden'},
        created_at:     {type:'input','inputType': 'hidden'},
        updated_at:     {type:'input','inputType': 'hidden'},
        deleted_at:     {type:'input','inputType': 'hidden'},
        created_by:     {type:'input','inputType': 'hidden'},
        updated_by:     {type:'input','inputType': 'hidden'},
        descrizione_it: {type:'input','inputType': 'hidden'},
        descrizione_en: {type:'input','inputType': 'hidden'},
        descrizione_de: {type:'input','inputType': 'hidden'},
        descrizione	:   {type:'input','inputType': 'hidden'},
        tags:           {type:'input','inputType': 'hidden'},
        titolo_en:      {type:'input','inputType': 'hidden'},
        titolo_de:      {type:'input','inputType': 'hidden'},
        attivo:         {type: 'swap','mode': 'edit'},
        in_evidenza:    {type: 'swap','mode': 'edit'},
        activated:      {type: 'swap','mode': 'edit'},
        verified:       {type: 'swap','mode': 'edit'},
        errors :        {type:'input','inputType': 'hidden'},
        oauth_type :    {type:'input','inputType': 'hidden'},
        oauth_data :    {type:'input','inputType': 'hidden'},
        oauth_id :      {type:'input','inputType': 'hidden'},
        token:          {type:'input','inputType': 'hidden'},
        icon:           {type: 'faicon'},
        indirizzi:      {type:'input','inputType': 'hidden'},
        telefoni:       {type:'input','inputType': 'hidden'},
        emails:         {type:'input','inputType': 'hidden'},
        fotos:          {type: 'hasmany_upload',uploadType: 'foto',limit:1},
        attachments:    {type: 'hasmany_upload',uploadType: 'attachment',limit:1},
        data:           {type: 'date'}
    }
});

var EditConfs = Class.extend({
    actions : ['actionSave','actionBack','actionSaveBack'],
    extra_actions : {},
    labels: 'left',
    fields: [],
    fields_type: {
        id: {type:'input','inputType': 'hidden'},
        created_at: {type:'input','inputType': 'hidden'},
        updated_at: {type:'input','inputType': 'hidden'},
        deleted_at: {type:'input','inputType': 'hidden'},
        created_by: {type:'input','inputType': 'hidden'},
        updated_by: {type:'input','inputType': 'hidden'},

        newsletter_registered:  {type: 'choice', choiceType: 'radio'},
        in_evidenza:            {type: 'choice', choiceType: 'radio'},
        attivo:                 {type: 'choice', choiceType: 'radio'},
        riservato:              {type: 'choice', choiceType: 'radio'},
        activated:              {type: 'choice', choiceType: 'radio'},

        descrizione_it: {type: 'texthtml'},
        descrizione_en: {type: 'texthtml'},
        descrizione_de: {type: 'texthtml'},
        descrizione: {type: 'texthtml'},
        body: {type: 'texthtml'},
        note: {type: 'texthtml'},
        fotos: {type: 'hasmany_upload', uploadType: 'foto', 'label': 'no'},
        attachments: {type: 'hasmany_upload', uploadType: 'attachment', 'label': 'no'},
        //videos: {'type': 'video', 'label' : 'no'},
        data: {type: 'date', dateType: 'picker'},
        data_formatted: {type:'input','inputType': 'hidden'},
        status: {type:'input','inputType': 'hidden'},

        newsletter: {type:'input','inputType': 'hidden'},
        token: {type:'input','inputType': 'hidden'},
        captcha: {type: 'captcha'},
        icon: {type: 'faicon'},
        indirizzi: {
            type: 'hasmany',
            label: 'no'
        },
        telefoni: {
            type: 'hasmany',
            label: 'no'
        },
        emails: {
            type: 'hasmany',
            label: 'no'
        },
        gpslat: {
            type: 'decimal',
            decimal_digits: 5,
            int_digits: 2
            //symbol : "&euro;"
        },
        gpslon: {
            type: 'decimal',
            decimal_digits: 5,
            int_digits: 2
            //symbol : ""
        }
    },
    dependencies : {}
});

var InsertConfs = EditConfs.extend({});

var SearchConfs = Class.extend({
    actions : ['actionSearch','actionReset'],
    extra_actions : {},
    fields:[],
    fields_type : {},
    /*
    order: {},
    layout_columns: 3,
    control_type: {},
    layouts : {},
    lang_fields : []
    */
});

var ViewConfs = Class.extend({
    labels: 'left',
    actions : [],
    extra_actions : {},
    fields : [],
    fields_type: {
        attivo: {type: 'swap'},
        fotos : {type: 'hasmany_upload', uploadType: 'foto'},
        attachments: {type: 'hasmany_upload', uploadType: 'attachment'},
        id: {type:'input','inputType': 'hidden'},
        created_at: {type:'input','inputType': 'hidden'},
        updated_at: {type:'input','inputType': 'hidden'},
        deleted_at: {type:'input','inputType': 'hidden'},
        created_by: {type:'input','inputType': 'hidden'},
        updated_by: {type:'input','inputType': 'hidden'}
    }/*,
    layouts : {},
    lang_fields : []
    */
});

var CsvConfs = Class.extend({
    init : function () {

    },
    actions : [],
    upload_actions : [],//['actionRecuperaCsv'],
    load_actions : ['actionAddCsv','actionCsvCancel'],
    save_actions : ['actionSaveCsv','actionCsvCancel'],
    iszip : false,
    labels : 'left',
    fields : [],
    fields_type : {},
    load_fields : [],
    load_fields_type : {},
    save_fields : [],
    save_fields_type : {}
});

var CsvdataConfs = ListConfs.extend({
    init : function () {
        //this._super();
    },
    actions:['actionCsvShowAll','actionCsvShowError','actionCsvRevalidate'],
    error_type : {

        GTComReg : {
            readonly : true
        }
    }
});

var TreeConfs = Class.extend({

    child  : {}

});

var CalendarConfs = Class.extend({
    data_inizio : 'data',
    fields : [],
    dayClick : function(date, jsEvent, view) {
        // funzione chiamata al click del giorno vuoto
    },
    eventClick : function (calEvent, jsEvent, view) {
        // funzione chiamata al click sull'evento
    },
    viewRender : function (view,element) {},
    eventAfterAllRender : function (view) {}
});

var Confs = Class.extend({
    langs : ['it'],
    current_lang : 'it',
    /**
     * ritorna una istanza della classe definita come configurazione per il modello passato
     * se esiste una classi di configurazione per ruolo vince quella per ruolo
     * @param model : nome modello
     * @param action : tipo di configurazione in edit,list,insert ecc
     * @param role : ruolo dell'utente.
     */
    getConf : function (model,action,role) {
        var className = "Model_"+Utility.pascalCase(model);
        var classNameRole = className + (role?Utility.pascalCase(role):"");
        var defaultClass = Utility.pascalCase(action)+"Confs";

        //log.debug('checking ' + className + " or " + classNameRole);

        //log.debug('checking configuration action ' + action +  ' for  ' + model + " className " + className);
        if (window[classNameRole] && window[classNameRole][action]) {
            log.debug('loaded Conf ' + classNameRole + "." + action);
            return new window[classNameRole][action];
        }

        //log.debug('checking configuration action ' + action +  ' for  ' + model + " className " + className);
        if (window[className] && window[className][action]) {
            log.debug('loaded Conf ' + className + "." + action);
            return new window[className][action];
        }

        // il caso speciale action insert se non c'e' e' uguale all'edit
        if (action == 'insert') {
            if (window[className] && window[className]['edit']) {
                log.debug('loaded Conf ' + className + ".insert" );
                return new window[className]['edit'];
            }
        }
        log.debug('not found loading default className ' + defaultClass);
        return new window[defaultClass];



        // var className = "Model_"+Utility.pascalCase(model);
        // className += role?Utility.pascalCase(role):"";
        //
        // var defaultClass = Utility.pascalCase(action)+"Confs";
        // log.debug('checking configuration action ' + action +  ' for  ' + model + " className " + className);
        // if (window[className] && window[className][action]) {
        //     return new window[className][action];
        // }
        // // il caso speciale action insert se non c'e' e' uguale all'edit
        // if (action == 'insert') {
        //     if (window[className] && window[className]['edit']) {
        //         return new window[className]['edit'];
        //     }
        // }
        // log.debug('not found loading default className ' + defaultClass);
        // return new window[defaultClass];
    },
    getLangs : function () {
        return this.langs;
    }
});
/**
 * VERSIONE LIBRERIA 3
 */

var CupparisAction = Class.extend({
    action : '',
    actionTitle: '',
    actionIcon: '',
    actionClass : '',
    defaultActionClass: '',
    prefixClass: '',
    actionText : '',
    func : null,
    type : null,
    visible : true,
    enabled : true,
    buttonClass : 'btn btn-default',
    control_type : 'button',
    target : null,
    func : function () {},
    init : function (params) {
        if (!params)
            params = {};
        if (!params.actionClass) {
            params.actionClass = this.defaultActionClass;
        }
        params.actionClass += ' ' + this.prefixClass + '-action-' + this.action;
        if (params.actionText)
            this.actionText = $.translate(params.actionText);
        //console.log('action params',params)
        // if (!params.actionTitle) {
        //     var title = '';
        //     if (params.actionIcon) {
        //         title += '<i class="'+ params.actionIcon +'"></i> ';
        //     }
        //     if (params.actionText) {
        //         title += params.actionIcon;
        //     }
        //     params.actionTitle = title;
        // }

        if (!params.actionTitle && !this.actionTitle) {
            params.actionTitle = this.actionText;
        }

        if (params) {
            for (var key in params) {
                this[key] = params[key];
            }
        }
    }
});
CupparisAction.factory = function (type,params) {

}
var RecordAction = CupparisAction.extend({
    defaultActionClass : 'btn btn-default btn-xs',
    prefixClass : 'record',
});

var CollectionAction = CupparisAction.extend({
    defaultActionClass : 'btn btn-primary btn-xs',
    prefixClass : 'collection',
});

var actionAddQueue = CupparisAction.extend({
    action : 'actionAddQueue',
    actionTitle : 'Accoda',
    actionIcon:  'fa fa-download',
    actionText : 'Accoda',
    queue: 'test',
    startMsg : null,
    waitMsg : 'Lavorazione in corso',
    successMsg : 'ok',
    queue_params : function () { return {}; },
    //target : '_blank',
    //control_type : 'link',

    func : function () {
        var self  = this;
        if (self.startMsg) {
            $.confirmDialog(self.startMsg).ok(function () {
                self._addQueue(self.queue, self.queue_params());
            });
        } else {
            self._addQueue(self.queue,self.queue_params());
        }
    },

    _addQueue : function (queue,params) {
        var self = this;
        var r = Routes.addQueue;
        r.method(Routes.getUrlInstance('addQueue',{'queue':queue}),params,function (json) {
            console.log('json');
            if (json.error ) {
                $.errorDialog(json.msg);
                return ;
            }
            $.waitStart(self.waitMsg);
            self._waitQueue(json.jobId, function(json) {
                self._addQueueCallback(json);
            });
        });
    },
    _addQueueCallback : function (json) {
        var self = this;
        if (json.error) {
            $.errorDialog(json.msg);
            return ;
        }
        if (json.job.error) {
            $.errorDialog(json.error.msg);
            return ;
        }
        $.messageDialog(self.successMsg);
    },
    _waitQueue : function (jobId,callback) {
        var self =  this;
        var r = Routes.queueStatus;
        r.method(Routes.getUrlInstance('queueStatus',{'jobId':jobId}),function (json) {
            console.log('json');
            try {
                if (json.error) {
                    $.waitEnd();
                    if (callback) {
                        callback(json);
                    } else {
                        $.errorDialog(json.msg);
                    }
                    return ;
                }
                if (json.job.end) {
                    $.waitEnd();
                    if (callback) {
                        callback(json);
                    } else {
                        if (json.job.error) {
                            $.errorDialog(json.job.msg);
                        }
                    }
                    return ;
                }

                setTimeout(function () {
                    self._waitQueue(jobId,callback);
                },2000);
            } catch (e) {
                $.waitEnd();
                if (callback) {
                    callback({error:1,msg:e.message});
                } else {
                    $.errorDialog(e.message);
                }
                return ;
            }
            return ;


        })
    }
});

var actionAddQueueRecord = RecordAction.extend({
    action : 'actionAddQueue',
    actionTitle : $.translate('general-accoda'),
    actionIcon:  'fa fa-download',
    actionText : $.translate('general-accoda'),
    queue: 'test',
    startMsg : null,
    waitMsg : 'Lavorazione in corso',
    successMsg : 'ok',
    queue_params : function () { return {}; },
    //target : '_blank',
    //control_type : 'link',

    func : actionAddQueue.prototype.func,
    _addQueue : actionAddQueue.prototype._addQueue,
    _addQueueCallback : actionAddQueue.prototype._addQueueCallback,
    _waitQueue : actionAddQueue.prototype._waitQueue,
});
var actionAddQueueCollection = CollectionAction.extend({
    action : 'actionAddQueue',
    actionTitle : 'Accoda',
    actionIcon:  'fa fa-download',
    actionText : 'Accoda',
    queue: 'test',
    startMsg : null,
    waitMsg : 'Lavorazione in corso',
    successMsg : 'ok',
    queue_params : function () { return {}; },
    //target : '_blank',
    //control_type : 'link',

    func : actionAddQueue.prototype.func,
    _addQueue : actionAddQueue.prototype._addQueue,
    _addQueueCallback : actionAddQueue.prototype._addQueueCallback,
    _waitQueue : actionAddQueue.prototype._waitQueue,


});

var actionCsvDownloadQueueCollection = actionAddQueueCollection.extend({
    action : 'actionCsvDownloadQueueCollection',
    actionTitle : 'Accoda Csv Download',
    actionIcon:  'fa fa-download',
    actionText : 'Csv',
    csvType : null,
    queue : 'csv_export',
    waitMsg : 'Generazione del file in corso',
    callbackRoute : '/downloadtemp/',
    queue_params : function () {
        var config = Facade.controller.getViewConfig(this.view.keyId);
        var params = _.clone(config.query_params);
        params.model = this.view.modelName;
        if (this.csvType)
            params.csvType = this.csvType;
        if (this.view.config.constraintKey) {
            params.constraintKey = this.view.config.constraintKey;
            params.constraintValue = this.view.config.constraintValue;

        }
        return params;
    },
    _addQueueCallback : function (json) {
        var self = this;
        console.log('adddqueued',json, self);
        var output_data = JSON.parse(json.job.output_data);
        var downloadUrl = self.callbackRoute + output_data.filename;
        //var downloadUrl = '/downloadtemp/' + output_data.filename;
        // $.messageDialog('Route download: ' + downloadUrl);
        document.location.href = downloadUrl;
    },

});

var actionPdfDownloadQueueCollection = actionAddQueueCollection.extend({
    action : 'actionPdfDownloadQueueCollection',
    actionTitle : 'Accoda Pdf Download',
    actionIcon:  'fa fa-download',
    actionText : 'Pdf',
    pdfType : 'list',
    queue : 'pdf_export',
    waitMsg : 'Generazione del file in corso',
    callbackRoute : '/downloadtemp/',
    queue_params : function () {
        var config = Facade.controller.getViewConfig(this.view.keyId);
        var params = _.clone(config.query_params);
        params.model = this.view.modelName;
        if (this.pdfType)
            params.pdfType = this.pdfType;
        if (this.view.config.constraintKey) {
            params.constraintKey = this.view.config.constraintKey;
            params.constraintValue = this.view.config.constraintValue;
        }
        return params;
    },
    _addQueueCallback : function (json) {
        var self = this;
        console.log('adddqueued',json, self);
        var output_data = JSON.parse(json.job.output_data);
        var downloadUrl = self.callbackRoute + output_data.filename;
        //var downloadUrl = '/downloadtemp/' + output_data.filename;
        // $.messageDialog('Route download: ' + downloadUrl);
        document.location.href = downloadUrl;
    },

});

var actionPdfDownloadQueueRecord = actionAddQueueRecord.extend({
    action : 'actionPdfDownloadQueueRecord',
    actionTitle : 'Accoda Pdf Download',
    actionIcon:  'fa fa-download',
    actionText : 'Pdf',
    pdfType : 'record',
    queue : 'pdf_export',
    waitMsg : 'Generazione del file in corso',
    callbackRoute : '/downloadtemp/',
    func : function (id) {
        var self  = this;
        var params = self.queue_params();
        params.id = id;
        self._addQueue(self.queue,params);
    },
    queue_params : function () {
        var config = Facade.controller.getViewConfig(this.view.keyId);
        var params = _.clone(config.query_params);
        params.model = this.view.modelName;
        if (this.pdfType)
            params.pdfType = this.pdfType;
        return params;
    },
    _addQueueCallback : function (json) {
        var self = this;
        console.log('adddqueued',json, self);
        var output_data = JSON.parse(json.job.output_data);
        var downloadUrl = self.callbackRoute + output_data.filename;
        //var downloadUrl = '/downloadtemp/' + output_data.filename;
        //  $.messageDialog('Route download: ' + downloadUrl);
        document.location.href = downloadUrl;
    },

});

var defaultSingleActions = {
    actionDelete : new RecordAction({
        action : 'actionDelete',
        actionTitle : 'Cancella',
        actionIcon:  'fa fa-remove text-danger',
        actionClass :null,
        actionText : '',
    }),
    actionView : new RecordAction({
        action : 'actionView',
        actionTitle :'Visualizza',
        actionIcon:  'fa fa-list-alt',
        actionClass :null,
        actionText : '',
    }),
    actionEdit: new RecordAction({
        action : 'actionEdit',
        actionTitle : 'Modifica',
        actionIcon:  'fa fa-edit',
        actionClass :null,
        actionText : '',
    }),
    actionSave : new RecordAction({
        action : 'actionSave',
        actionTitle : 'Salva',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Salva',
    }),
    actionCancel : new RecordAction({
        action : 'actionCancel',
        actionTitle : 'Annulla',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Annulla',
    }),
    actionSearch : new RecordAction({
        action : 'actionSearch',
        actionTitle : 'Ricerca',
        actionIcon:  'fa fa-search',
        actionClass : 'btn btn-xs btn-default text-info',
        actionText : 'Cerca',
    }),
    actionReset : new RecordAction({
        action : 'actionReset',
        actionTitle : 'Annulla filtri ricerca',
        actionIcon:  '',
        actionClass : 'btn btn-xs btn-default',
        actionText : 'Annulla filtri',
    }),
    actionAddCsv : new RecordAction({
        action : 'actionAddCsv',
        actionTitle : 'Carica i dati del file',
        actionIcon:  'fa fa-upload ',
        actionClass :null,
        actionText : 'Carica file',
    }),
    actionRecuperaCsv : new RecordAction({
        action : 'actionRecuperaCsv',
        actionTitle : 'Recupera caricamento precedente',
        actionIcon:  'fa fa-folder ',
        actionClass :null,
        actionText : 'Recupera caricamento precedente',
    }),
    actionSaveCsv : new RecordAction({
        action : 'actionSaveCsv',
        actionTitle : 'Salva dati',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Salva dati',
    }),
    actionCsvCancel : new RecordAction({
        action : 'actionCsvCancel',
        actionTitle : '',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Annulla',
    }),
    actionCsvDownloadRecord : new RecordAction({
        action : 'actionCsvDownloadRecord',
        actionTitle : 'Scarica Csv',
        actionIcon:  '',
        actionClass :null,
        actionText : 'downloadCsv',
        target : '_blank',
        control_type : 'link',
        func : function (id) {
            var config = Facade.controller.getViewConfig(this.keyId);

            return '/download/csv/' + this.modelName + '?' + $.param(config.query_params);
        }
    }),
    actionPdfDownloadRecord : new RecordAction({
        action : 'actionPdfDownloadRecord',
        actionTitle : 'Scarica Pdf',
        actionIcon:  'fa fa-file-pdf-o',
        actionClass :null,
        actionText : '',
        pdfType : 'record',
        target : '_blank',
        control_type : 'link',
        func : function (id) {
            var config = Facade.controller.getViewConfig(this.keyId);

            return '/download/pdf/' + this.modelName + '/' + this.pdfType + '?' + $.param(config.query_params);
        }
    }),

    actionBack : new RecordAction({
        action : 'actionBack',
        actionTitle : 'Indietro',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Torna indietro',
    }),

    actionSaveBack : new RecordAction({
        action : 'actionSaveBack',
        actionTitle : 'Salve e torna pagina precedente',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Salva e torna indietro',
    })
};

var defaultGlobalActions = {
    actionDeleteAll: new CollectionAction({
        action : 'actionDeleteAll',
        actionTitle : 'Cancella selezionati',
        actionIcon:  'fa fa-trash text-danger',
        actionClass : 'btn btn-default btn-xs text-danger',
        actionText : 'Selezionati',
        needSelection : true,
    }),
    actionInsert: new CollectionAction({
        action : 'actionInsert',
        actionTitle : 'Inserisci',
        actionIcon:  'fa fa-plus text-success',
        actionClass :'btn btn-default btn-xs text-success',
        actionText : 'Nuovo',
    }),
    actionCsvShowAll : new CollectionAction({
        action : 'actionCsvShowAll',
        actionTitle : 'Mostra tutte le righe',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Mostra tutto',
    }),
    actionCsvShowError : new CollectionAction({
        action : 'actionCsvShowError',
        actionTitle : 'Mostra solo errori',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Mostra solo errori',
    }),
    actionCsvRevalidate : new CollectionAction({
        action : 'actionCsvRevalidate',
        actionTitle : 'Rivalida csv caricato',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Rivalida csv',
    }),
    actionBack : new CollectionAction({
        action : 'actionBack',
        actionTitle : 'Indietro',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Torna indietro',
    }),
    actionReload : new CollectionAction({
        action : 'actionReload',
        actionTitle : 'Ricarica',
        actionIcon:  '',
        actionClass :null,
        actionText : 'Reload',
    }),
    actionCsvDownloadCollection : new CollectionAction({
        action : 'actionCsvDownloadCollection',
        actionTitle : 'Scarica Csv',
        actionIcon:  'fa fa-download',
        actionClass :null,
        actionText : 'Csv',
        target : '_blank',
        control_type : 'link',
        func : function () {
            var config = Facade.controller.getViewConfig(this.view.keyId);
            return '/download/csv/' + this.view.modelName + '?' + $.param(config.query_params);
        }
    }),
    actionPdfDownloadCollection : new CollectionAction({
        action : 'actionPdfDownloadCollection',
        actionTitle : 'Scarica Pdf',
        actionIcon:  'fa fa-download',
        actionClass :null,
        actionText : 'Pdf',
        target : '_blank',
        control_type : 'link',
        func : function () {
            var config = Facade.controller.getViewConfig(this.view.keyId);
            return '/download/csv/' + this.view.modelName + '?' + $.param(config.query_params);
        }
    }),
    actionPdfDownloadQueueCollection : new CollectionAction({
        action : 'actionPdfDownloadQueueCollection',
        actionTitle : 'Accoda Pdf Download',
        actionIcon:  'fa fa-download',
        actionClass :null,
        actionText : 'Pdf',
        target : '_blank',
        control_type : 'link',
        func : function () {
            var config = Facade.controller.getViewConfig(this.view.keyId);
            return '/queue/add/pdf_export' + '?model=' +this.view.modelName + '&' +$.param(config.query_params);
        }
    }),
    actionCsvDownloadCollectionQueue :new CollectionAction({
        action: 'actionCsvDownloadCollectionQueue',
        actionTitle: 'Accoda Csv Download',
        actionIcon: 'fa fa-download',
        actionClass: null,
        actionText: 'Csv',
        target: '_blank',
        control_type: 'link',
        func: function () {
            var config = Facade.controller.getViewConfig(this.view.keyId);
            return '/queue/add/csv_export' + '?model=' + this.view.modelName + '&' + $.param(config.query_params);
        }
    })
};


// azioni di utilita' generali del core ma non istanziate nel controller.
var actionSend = new RecordAction({
    action : 'actionSend',
    //icon : 'fa-send',
    actionIcon : 'fa fa-envelope-o',
    actionTitle : 'Spedisci',
    func : function (id,subject_it) {
        log.info('spedisco newsletter ' + id + " : " + subject_it);
        var controller = this._controller;
        var vListKey = this.keyId;
        var tpl_values = {
            subject_it:subject_it,
            sends_type :{'all':'Tutti gli iscritti','users':'Solo gli utenti iscritti','newsletter_email':'Solo agli iscritti non utenti'}
        };

        $.renderJson('#sendnewsletter_dialog','#sendnewsletter_dialog',tpl_values);
        $('#sendnewsletter_dialog').modal('show').ok(function () {
            var type = $('#sendnewsletter_dialog select[name="type"]').val();

            $.get(Facade.getUrl('/queue/add/newsletter/send'),{newsletter_id:id,type:type},function (json) {
                if (json.error) {
                    $.errorDialog(json.msg);
                    return;
                }

            }).fail(function (e) {
                $.errorDialog($.getFailMessage(e));
            });
        });
    }
});


var actionSendAll = new RecordAction({
    action : 'actionSendAll',
    actionIcon : 'fa fa-send',
    // actionClass : 'btn-primary',
    actionText : 'Salva e Spedisci a tutti',
    func : function (id,subject_it) {
        var _controller = this; // oggetto chiamante qui sempre il controller
        $.progressDialog("Salvataggio in corso...", 1);
        var controller = this._controller;
        var vKey = this.keyId;
        controller.save(vKey,null,null,function (json){
       // _controller._save(function (json) {
            if (json.error) {
                $.errorDialog(json.msg);
                return ;
            }
            $.progressDialog("Invio newsletter ...", 50);
            $.get(Facade.getUrl('/queue/add/newsletter/send'),{newsletter_id:id,type:'all'},function (json) {
                $.progressDialogClose();
                if (json.error) {
                    $.errorDialog(json.msg);
                    return;
                }

                $.messageDialog("Salvataggio e invio avvenuto con successo");
            }).fail(function (e) {
                $.progressDialogClose();
                $.errorDialog($.getFailMessage(e));
            })
        });

    }
});

var actionSendUsers = new RecordAction({
    action : 'actionSendUsers',
    actionIcon : 'fa fa-send',
    actionText : 'Salva e Spedisci agli utenti',
    func : function (id,subject_it) {
        alert('id ' + id);
    }
});
/**
 * VERSIONE LIBRERIA 3
 */

var ValidationRules = Class.extend({
    form: null,
    init: function (form) {
    	this.form = form;
    },
    get : function (rule_string) {
    	log.warn("metodo da implementare");
    	return {};
    }
});

var Vrequired = ValidationRules.extend({
	get : function (key,rule_string) {
		var self = this;
		return { required : true};

/*		
		
		
		var rules = {};
		rules[key] = { required : true};
		self.form.validate({
			rules: rules
		});
		*/
	}
});

var Vbetween =  ValidationRules.extend({
	get : function (key,rule_string) {
		var tmp = rule_string.split(":");
		var range = tmp[1].split(",");
		return {
			minlength : range[0],
			maxlength : range[1]
		};
		/*
		// rule_string between:min,max
		var self = this;
		var tmp = rule_string.split(":");
		var range = tmp[1].split(",");
		self.obj.attr('minlength',range[0].trim());
		self.obj.attr('maxlength',range[1].trim());
		*/
	}
});
/*
var Valpha_num = ValidationRules.extend({
	get : function (key,rule_string) {
		//var self = this;
		//self.obj.attr('required','');
	}
});
*/
var Vemail = ValidationRules.extend({
	get : function (key,rule_string) {
		return {email:true};
	}
});

var Vconfirmed = ValidationRules.extend({
	get : function (key,rule_string) {
		//return {};
		return { equalTo : 'input[name="'+key + '_confirmation"]'};
		/*
		var self = this;
		self.obj.attr('equalto',self.obj.attr("name") + "_confirmation");
		*/
	}
});

var Vsometimes = ValidationRules.extend({
	get : function(key,other_rules) {
		var self = this;
		var _env = {
				key : key,
				other_rules : other_rules,
				form : self.form,
		};
		return {sometimes : _env}
	}

})
if (jQuery.validator) {
	jQuery.validator.addMethod("sometimes", function(fake, element,data) {
		//console.log(data);
		$(element).rules('remove', 'sometimes');
		if ( !$(element).val())
			return true;
		for (var i in data.other_rules) {
			var rule = data.other_rules[i];
			var rule_name = rule.split(":").length > 0?rule.split(":")[0]:rule;
			rule_name = 'V'+rule_name;
			if ( !window[rule_name] )
				continue;
			var r = new window[rule_name](data.form);
			$(element).rules('add',r.get(data.key,rule));
			
		}
		var validator = data.form.validate();
		var result = validator.element( $(element) );
		var msg = validator.errorList.length?validator.errorList[0]['message']:"undefined error";
		for (var r in $(element).rules()) {
			$(element).rules('remove', r);
		}
		$(element).rules('add',{sometimes:data});
		$(element).rules('add',{messages : {sometimes:msg}});
		return result;
		
	}, "mesaggio dinamico");
}
/**
 * VERSIONE LIBRERIA 3
 */


/**
 * struttura Configurazione modelli parte client
 * modello :{
 * 		azione(search,detail,list,csv,view)
 * 		search : { 
 * 			fields : {
 * 				nome : operatore search
 * 			}
 * 		}
 * 
 * }
 * 
 * 
 * type dei campi per l'oggetto control type
 * 
 * date_picker			: controllo calendario con il vero campo come input nascosto
 * hidden				: controllo input nascosto
 * select				: controllo select
 * hasmany
 * switchview			: icona circolare verde/rosso a seconda del valore 1 o 0
 * switchlink			: icona circolare clickabile per switchare da 0 a 1 o valore custom chiamando la 
 * 						  funzione ajax set.
 * texthtml				: controllo con associato i tinyMCE per editare testo html
 * text					: solo text html senza nessun controllo associato
 * hasmany_through
 * input				: contollo input text
 * decimal				: controllo con due input uno per la parte intera, e uno per la parte decimale
 * hidden				: controllo hidden
	password 				:'RenderPassword',
	checkbox				:'RenderCheckbox',
	radio					:'RenderCheckbox',
	time					:'RenderTime',
	datetime_select 		:'RenderDateTime',
	date_select				:'RenderDate',
	datetime_picker			:'RenderDateTime',
	date_picker				:'RenderDate',
	textarea				:'RenderTextarea',
	autocomplete			:'RenderAutocomplete',
	foto					:'RenderFoto',
	attachment				:'RenderAttachment',
	video					:'RenderVideo',
	hasmany					:'RenderHasmany',
	hasmany_through 		:'RenderHasmanyThrough',
	carousel				:'RenderCarousel',
	map						:'RenderMap',
	belongsto				:'RenderBelongsto',
    captcha                 :'RenderCaptcha'
 */

var Model_TicketMsg = {
    edit : EditConfs.extend({
        fields: [
            'body',
            'fotos',
        ],

        init: function () {
            this.fields_type.ticket_id = {
                type: 'input',
                inputType: 'hidden'
            };
            this.fields_type.ticket = {
                    type: 'input',
                    inputType: 'hidden'
                };
            this.fields_type.user_id = {
                    type: 'input',
                    inputType: 'hidden'
                };
            this.fields_type.user = {
                    type: 'input',
                    inputType: 'hidden'
                };
            this.fields_type.sent_by = {
                    type: 'input',
                    inputType: 'hidden'
                };
        }
    })
};

var Model_Ticket = {
    search: SearchConfs.extend({
        fields: [
            'email'
        ],
        operator: {
            'email': 'like',

        },
    }),

    list : ListConfs.extend({
        init: function () {

                this.fields_type.created_at = {type: 'date',format:'numeric-time'};
                this.fields_type.user_id = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.messages = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.status = {type: 'text'};
                this.fields_type.first_msg_fotos = {
                    type: 'hasmany_upload',
                    'uploadType': 'foto',
                };
                this.fields_type.user = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.email = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.name = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.phone = {
                    type: 'input',
                    inputType: 'hidden'
                };
                //updated_by: {'type': 'hidden'},

        },
        fields : [
          'subject',
          'status',
            'contatto_email',
            'contatto',
            'created_at',
            'first_msg_body',
            'first_msg_fotos',
        ],

        actions : ['actionHistory','reply','close'],//['actionView'],
        extra_actions : {
            actionHistory: {

                actionTitle : 'history',
                actionIcon : 'fa fa-history',
                func : function (id) {
                    log.info('conversazione ticket ' + id);
                    document.location.href='/ticket/history/'+id;
                }
            },
            reply : {
                //icon : 'fa-send',
                actionTitle : 'reply',
                actionIcon : 'fa fa-paper-plane-o',
                enabled : function (status) {
                    return status == 'open';
                },
                func : function (id) {
                    log.info('risposta ticket ' + id);
                    document.location.href='/ticket/reply/'+id;
                }
            },
            close : {
                actionTitle : 'close',
                actionIcon : 'fa fa-lock',
                enabled : function (status) {
                    return status == 'open';
                },
                func : function (id) {
                    log.info('chiuso ticket ' + id);
                    var _controller = this._controller;
                    var vKey = this.keyId;
                    var url = "/api/json/set/ticket/status/closed";
                    $.post(Facade.getUrl(url),{id:id},function(json) {
                        if (json.error) {
                            $.errorDialog(json.msg);
                            return ;
                        }
                        _controller.reload(vKey);
                    }).fail(function (e) {
                        log.error(e);
                        $.errorDialog($.getFailMessage(e));
                        return ;
                    })
                    //document.location.href='/ticket/changestate/'+id+'/close';
                }
            },
            reopen : {
                actionIcon : 'fa fa-reload',
                actionText : 're-open',
                enabled : function (status) {
                    return status == 'closed';
                },
                action : function (id) {
                    log.info('riaperto ticket ' + id);
                    var _controller = this;

                    var url = "/api/json/set/ticket/status/open";
                    $.post(Facade.getUrl(url),{id:id},function(json) {
                        if (json.error) {
                            $.errorDialog(json.msg);
                            return ;
                        }
                        _controller.reload();
                    }).fail(function (e) {
                        log.error(e);
                        $.errorDialog($.getFailMessage(e));
                        return ;
                    })
                    //document.location.href='/ticket/changestate/'+id+'/close';
                }
            }
        }



    }),
    edit : EditConfs.extend({
        fields : [
            'subject',
            'status',

            'created_at',
            'first_msg_body',
            'first_msg_fotos',
        ],
        init: function () {
            this.fields_type.first_msg_body = {type: 'texthtml'};
            this.fields_type.user = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.user_id = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.messages = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.contatto = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.contatto_email = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.first_msg_fotos = {
                    type: 'hasmany_upload',
                    'uploadType': 'foto',
                    modelName: 'ticket_msg'
                }
        },
        actions: ['actionSave','actionCancel'],
    })
};

var Model_Faq = {
		listedit : ListConfs.extend({
            init: function () {

				this.fields_type.id = {type:'text'};
				this.fields_type.created_at = {type: 'text'};
                this.fields_type.updated_at = {type: 'text'};
                this.fields_type.descrizione_it = {type: 'texthtml'}
            },
		})
	}

var Model_News = {
        search: SearchConfs.extend({
            fields: ['titolo_it',
                'data'
            ],
            operator : {
                titolo_it : 'like'
            },
            fields_type: {
                'data': {
                    'type': 'date',
                    'dateType' : 'picker'
                }
            },
            layouts: {
            	'titolo_it' : 'custom'
            }
        }),
        list: ListConfs.extend({
            init: function () {

                this.fields_type.data = {
                    type: 'input',
                    inputType: 'hidden'
                }
            },
            fields: [
                'attachments',
                'fotos',
                'titolo_it',
                'data_formatted',
                'attivo'
            ],
        }),
        edit : EditConfs.extend({
            // init: function () {
            //     this.fields_type.tags = {
            //             type: 'hasmany',
            //             'label': 'no'
            //     }
            // },

        	fields : [
                'data',
                'titolo_it',
                'titolo_en',
                'titolo_de',
                'descrizione_it',
                'descrizione_en',
                'descrizione_de',
                'attivo',
                'fotos',
                'attachments'

        	],

        }),
        calendar : CalendarConfs.extend({
        	date_field : 'data',
        	weeks : false, // will hide Saturdays and Sundays
        	header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
        	}
        }),
    };

var Model_Log = {
        search : SearchConfs.extend({
            fields: [
                'type'
            ],
            operator : {
                type : 'like'
            }

        }),
        list : ListConfs.extend({
            init: function () {

                this.fields_type.user_id = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.user = {type : 'belongsto', 'fields':['email']};
            },
            fields: [
                'user',
                'type',
                'description',
                'details',
                'ip_address',
                'user_agent',
            ],
        	actions : ['actionView']
        }),
    };

var Model_NewsletterEmail = {
        search : SearchConfs.extend({
            fields: ['email',
                'verified'
            ],
            operator : {
                email : 'like'
            },
            fields_type: {
                'verified':{ type:'select'}
            }
        }),

        list : ListConfs.extend({
            init: function () {
                this.fields_type.user_id = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.user = {type: "belongsto", 'fields':['email']}
            },
        }),
        edit : EditConfs.extend({
            init: function () {
                this.fields_type.user_id = {
                    type: 'input',
                    inputType: 'hidden'
                };
                this.fields_type.user = {type: "belongsto", 'fields':['email']}
            },
        }),

    };

var Model_Pagina = {
        search : SearchConfs.extend({
            fields: ['titolo_it'],
            operator : {
                titolo_it : 'like'
            }
        }),
        list : ListConfs.extend({
            init: function () {

        		this.fields_type.videos = {type: "video"};
        		this.fields_type.menu_item = {type: "belongsto",fields:['nome_it']}
            },
        }),
        edit : EditConfs.extend({
            init: function () {
                this.fields_type.miMenuId = {type: 'select'};
                this.fields_type.miParentId = {type: 'select'};
                this.fields_type.miOrdine = {type: 'select'};
                this.fields_type.menu_item_id  = {
                    type: 'input',
                    inputType: 'hidden'
                }
            },
            connected_fields: {
                miParentId: {
                    sources: ['miMenuId','menu_item_id'],//{'miMenuId':'id'},
                    action: {'name': 'listing', params: {'0_ITEM_NONE': 1}},
                    code: function (event, jQE, json) {
                        console.log(json);
                        try {
                            if (json.error) {
                                $.errorDialog(json.msg);
                                return;
                            }
                            var selectedVal = $(this).val();//$($.find('[name="miParentId"]')[0]).val();
                            $(this).html("");

                            for (var i in json.result) {
                                var selected = '';
                                if (json.result[i].key === selectedVal) {
                                    selected = ' selected="selected"';
                                }
                                $(this).append("<option value='" + json.result[i].key + "'" + selected + ">" + json.result[i].value + "</option>");
                            }
                        } catch (e) {
                            $.errorDialog(e.message);
                        }

                    }
                }
            }
        }),
    };

var Model_User = {
    list : ListConfs.extend({
        init: function () {
            this.fields_type.newsletter_registered = {type : 'swap'};
            this.fields_type.roles = {
                type: 'hasmany',

                layout: 'column',
                fields: ['id'],
                fields_type: {
                    // se vogliamo dettagliare di piu'
                },
                separator: ' ---> '
            };
            this.fields_type.last_login = {
                type : 'date',
                format : 'numeric-time'
            };
        },
        fields: [
            'email','username',
            'cognome','nome',
            'roles',
            'verified',
            'activated',
            'last_login',
            'newsletter_registered',
            'attachments',
            'fotos',

        ],
        order_fields: {
            'email': 'email', 'username': 'username', 'cognome': 'cognome', 'nome': 'nome'
        },

    }),
    edit : EditConfs.extend({
        init: function () {
            this.fields_type.roles = {
                type: 'input',
                inputType: 'hidden'
            };
            this.fields_type.role = {'type': 'select'};
            this.fields_type.access_roles_exists = {
                type: 'input',
                inputType: 'hidden'
            };
            this.fields_type.password = {'type': 'input', inputType :'password'};
            this.fields_type.password_confirmation = {'type': 'input', inputType : 'password'};
            this.fields_type.logins = {
                type: 'input',
                inputType: 'hidden'
            };
            this.fields_type.last_login = {
                type: 'input',
                inputType: 'hidden'
            };

        },
        actions : ['actionSave','actionBack']
    }),
    search : SearchConfs.extend({
        fields: ['email', 'username',
            'cognome', 'nome'
        ],
        operator : {
            email : 'like',
            username : 'like',
            cognome : 'like',
            nome    : 'like'
        }
    }),
    view: ViewConfs.extend({
        fields_type : {
            verified :  { type: 'swap' },
            activated : { type: 'swap'},
            password :  {
                type: 'input',
                inputType: 'hidden'
            },
            password_confirmation : {
                type: 'input',
                inputType: 'hidden'
            },
            newsletter : {
                type: 'input',
                inputType: 'hidden'
            },
            newsletter_registered : {type : 'swap'},
            roles : {
                type: 'input',
                inputType: 'hidden'
            },
        }
    })
};
var Model_MenuItem = {
        list : ListConfs.extend({
            init: function () {

            },
            order_fields: {'nome': 'nome_it', 'ordine': 'ordine'}
        }),
        edit : EditConfs.extend({

            fields: [
              'nome_it',
              'path',
                'menu_id',
                'parent_id',
                'ordine',
                'attivo',
                'linked',

            ],
            init: function () {

                this.fields_type.menu_id = {type: 'select'};
                this.fields_type.parent_id = {
                    type: 'select',
                    dependencies : {
                        sources : ['menu_id'],
                        func : function (evt,container) {
                            var view = this;
                            console.log("func dependencies",evt,container,this._controller);

                            if (evt.params) {
                                var sConf = {
                                    url : Routes.getUrlInstance('listing',{model:view.modelName}),
                                    query_params : {backParams : view.data.backParams,fieldKey:evt.key,sourceValues:{menu_id:evt.params}},
                                    method : Routes.listing.method,
                                    post_params : {}
                                };
                                view._controller._executeRequest(sConf,function (json) {
                                    if (json.error) {
                                        $.errorDialog(json.msg);
                                        return ;
                                    }
                                    var selectElement = $(container).find('select').first();
                                    var selectedVal = selectElement.val();//$($.find('[name="miParentId"]')[0]).val();
                                    selectElement.html("");
                                    selectElement.append("<option value=''>Nessuno</option>");

                                    //console.log(Object.keys(json.result));
                                    for (var i in json.result) {
                                        var selected = '';
                                        if (json.result[i].key === selectedVal) {
                                            selected = ' selected="selected"';
                                        }
                                        selectElement.append("<option value='" + json.result[i].key + "'" + selected + ">" + json.result[i].value + "</option>");
                                    }
                                })
                                //var confRequest = new Rout
                            }
                        }
                    }
                };
            },
            connected_fields: {
                parent_id: {
                    sources: ['menu_id'],
                    action: {'name': 'listing', params: {'0_ITEM_NONE': 1}},
                    code: function (event, jQE, json) {
                        console.log(json);
                        try {
                            if (json.error) {
                                $.errorDialog(json.msg);
                                return;
                            }
                            var selectedVal = $(this).val();//$($.find('[name="miParentId"]')[0]).val();
                            $(this).html("");
                            //console.log(Object.keys(json.result));
                            for (var i in json.result) {
                                var selected = '';
                                if (json.result[i].key === selectedVal) {
                                    selected = ' selected="selected"';
                                }
                                $(this).append("<option value='" + json.result[i].key + "'" + selected + ">" + json.result[i].value + "</option>");
                            }
                        } catch (e) {
                            $.errorDialog(e.message);
                        }

                    }
                }
            }
        }),
    };
var Model_Menu = {
    	tree : TreeConfs.extend({
    		childrenModelName : {
    			"menu_items" : {
    				fields : ['nome_it','path'],
    				fields_type: {}
    			}

    		}
    	}),
    	list : ListConfs.extend({
            init: function () {
    			this.fields_type.id = { type :'text'};
    			this.fields_type.menu_items = {
    				type :'hasmany',
    				layout : 'column',
    				fields : ['nome_it','path'],
    				fields_type : {
    					// se vogliamo dettagliare di piu'
    				},
    				separator : " ---> "
    			}
            },
    	}),
    	edit : EditConfs.extend({
            init: function () {
	    		this.fields_type.menuItems = {
	    			type : 'hasmany'
	    		}
    		}
    	}),
    };
var Model_Role = {
    search : SearchConfs.extend({
        fields : ['name'],
        fields_type : {
            "name" : {
                type : 'input',
                operator : 'like'
            }
        }
    }),
    list : ListConfs.extend({
        fields_type : {
            permissions : {
                type : 'hasmany',
                fields : ['id','route']
            }
        }
    }),
    tree : TreeConfs.extend({
        childrenModelName : {
            "permissions" : {
                fields : ['name','route'],
                fields_type: {},
                multiple : true
            }

        }
    })
};

var Model_CsvmodelComuneIstat = {
	list : ListConfs.extend({
        init: function () {

        },
		errors_cb : { // callback associate agli errori nei campi

		}
	}),
};

var Model_Newsletter = {
    	list : ListConfs.extend({
            init: function () {
    			this.fields_type.sends = {
                    type : 'hasmany',
    				fields : ['created_at','type','status'],
    				layout : 'column',
    				empty_text : 'never_send'   // ci va la chiave in lingua
    			};

            },
            actions : ['actionInsert','actionDelete','actionEdit','actionSend'],
            extra_actions : {
                actionSend : actionSend
            }
            /*
    		extra_actions : {
    			send : {
                	 //icon : 'fa-send',
                	 text : 'Spedisci',
                	 action : function (id,subject_it) {
                		 log.info('spedisco newsletter ' + id + " : " + subject_it);
                		 var tpl_values = {
                				 subject_it:subject_it,
                				 sends_type :{'all':'all','users':'users','newsletter_email':'newsletter_email'}
                		 };

                		 $.renderJson('#sendnewsletter_dialog','#sendnewsletter_dialog',tpl_values);
                		 $('#sendnewsletter_dialog').modal('show').ok(function () {
                		var type = $('#sendnewsletter_dialog select[name="type"]').val();

                			 $.get('/queue/add/newsletter/send',{newsletter_id:id,type:type},function (json) {
                				 if (json.error) {
                					 $.errorDialog(json.msg);
                					 return;
                				 }

                			 }).fail(function (e) {
                				 $.errorDialog($.getFailMessage(e));
                			 });
                		 });
                	 }
                 }
    		}*/


    	}),
    	edit : EditConfs.extend({
            init: function () {
    			this.fields_type.body_it = { 'type' : 'texthtml'};
                this.fields_type.sends = {
                    type: 'input',
                    inputType: 'hidden'
                };
    		},
            actions : ['actionSave','actionSendAll','actionSendUsers','actionCancel'],
            extra_actions : {
                actionSendAll:actionSendAll,
                actionSendUsers:actionSendUsers
            }
            /*
    		extra_actions : {
    			send_all : {
                	 icon : 'fa-send',
                	 text : 'Salva e Spedisci a tutti',
                	 action : function (id,subject_it) {
                		 var _controller = this; // oggetto chiamante qui sempre il controller
                		 $.progressDialog("Salvataggio in corso...", 1);
                		 _controller._save(function (json) {
                			 if (json.error) {
                				 $.errorDialog(json.msg);
                				 return ;
                			 }
                			 $.progressDialog("Invio newsletter ...", 50);
                			 $.get('/queue/add/newsletter/send',{newsletter_id:id,type:'all'},function (json) {
                				 if (json.error) {
                					 $.errorDialog(json.msg);
                					 return;
                				 }
                				 $.progressDialogClose();
                				 $.messageDialog("Salvataggio e invio avvenuto con successo");
                			 }).fail(function (e) {
                				 $.progressDialogClose();
                				 $.errorDialog($.getFailMessage(e));
                			 })
                		 });

                	 }
                 },
                 send_users : {
                	 icon : 'fa-send',
                	 text : 'Salva e Spedisci agli utenti',
                	 action : function (id,subject_it) {
                		 alert('id ' + id);
                	 }
                 }
    		}*/
    	}),
    };
var Model_Visite = {
        csv: CsvConfs.extend({
            fields: [],
            fields_type: {}
        })
    };
var Model_ComuneIstat = {
        csv: CsvConfs.extend({
    		iszip : true,
    		fields: ['utente'],
    		fields_type:{
    			'utente' : {
                    type : 'input'
    			}
    		}
    	})
    };


/**
 * VERSIONE LIBRERIA 3
 * classe Interfaccia verso i vari componenti
 */

var Facade = {
    confs : null,
    controller : null,
    viewContainers : {},
    viewIds : {},
    renders : {}, // render generici fuori da ogni view
    role : null,
    tagNames :'viewlist,viewedit,viewview,viewcalendar,viewsearch,viewinsert',
    baseUrl : '',
    version : '3.0',

    init : function () {
        var self = this;
        self.confs = new Confs();
        self.controller = new Controller();
    },

    loadConf : function(modelName,type,callback) {
        var self = this;
        var script_url = "/js/ModelsConfs/" + modelName + ".js";
        Utility.loadScript(self.getUrl(script_url),function () {
            callback(self.confs.getConf(modelName,type,self.role));
        });
    },
    getConf : function(modelName,type,callback) {
        var self = this;
        return self.confs.getConf(modelName,type,self.role);
    },

    getKeyFromId : function (htmlId) {
        return this.viewIds[htmlId];
    },
    removeViewById : function (htmlId) {
        return this.removeView(this.getKeyFromId(htmlId));
    },
    removeView : function(key) {
        // constrollo che non esiste la key negli id html, altrimenti rimuovo anche da li'.
        for (var k in this.viewIds) {
            if (key == this.viewIds[k]) {
                delete this.viewIds[k];
                break;
            }
        }
        this.controller.removeView(key);
    },
    renderViewById : function (htmlId,callback) {
        this.controller.renderView(this.getKeyFromId(htmlId),callback);
    },
    renderView : function (key,callback) {
        this.controller.renderView(key,callback);
    },
    getViewById : function(htmlId) {
        return this.getView(this.getKeyFromId(htmlId));
    },
    getView : function (key) {
        return this.controller.getView(key);
    },

    //createList : function(modelName,container,conf) {
    createList : function(viewConf) {
        var self = this;
        var modelConf = viewConf.vConf?viewConf.vConf:self.getConf(viewConf.model,'list');
        modelConf.langs = self.confs.getLangs();
        modelConf.container = viewConf.container;
        var routeType = modelConf.routeType ? modelConf.routeType : 'list';
        //console.log("LIST ROUTTYEP ",routeType,modelConf,modelConf.routeType,(modelConf.routeType ? modelConf.routeType : 'list'));
        var vkey = null;
        viewConf.vConf = modelConf;
        // se esiste gia' una view associata all'id del container non la creo ma risetto le conf
        if (jQuery(modelConf.container).attr('id')) {
            vkey = self.getKeyFromId(jQuery(modelConf.container).attr('id'));
            if (vkey) {
                var view = self.controller.getView(vkey);
                if (view)
                    view.config = modelConf;
                return vkey;
            }
        }
        var viewClass = viewConf.viewClass?viewConf.viewClass:'ViewList';
        vkey = self.controller.addView(viewClass,{
            config : modelConf,
            modelName : viewConf.model,
            routeParams : {
                model : viewConf.model,
                constraintValue : modelConf.constraintValue,
                constraintKey : modelConf.constraintKey,
            },
            routeType:routeType,
            constraint : modelConf.constraint?modelConf.constraint:null,
        });

        //self.controller.renderView(vkey);
        return vkey;

    },

    createEdit : function(viewConf) { //function (modelName,pk,container,conf) {
        var self = this;
        var modelConf = null;
        var routeType = null;
        if (viewConf.pk) {
            modelConf = viewConf.vConf?viewConf.vConf:self.confs.getConf(viewConf.model,'edit',self.role); //new SearchConfs();
            routeType = modelConf.routeType ? modelConf.routeType : 'edit';
        } else {
            modelConf = viewConf.vConf?viewConf.vConf:self.confs.getConf(viewConf.model,'insert',self.role);
            routeType =  modelConf.routeType ? modelConf.routeType : 'insert';
        }


        modelConf.langs = self.confs.getLangs();
        modelConf.container = viewConf.container;
        viewConf.vConf = modelConf
        var viewClass ="ViewEdit";
        if (!viewConf.viewClass) {
            if (modelConf.groups) {
                var groupLength = _.keys(modelConf.groups).length;
                viewClass = viewClass += 'G' + groupLength;
            }
        } else {
            viewClass = viewConf.viewClass;
        }

        var vkey = self.controller.addView(viewClass,{
            config : modelConf,
            modelName : viewConf.model,
            pk : viewConf.pk,
            routeParams : {
                model : viewConf.model,
                pk : viewConf.pk,
                constraintValue : modelConf.constraintValue,
                constraintKey : modelConf.constraintKey,
            },
            routeType : routeType,
            constraint : modelConf.constraint?modelConf.constraint:null,
        });

        //self.controller.renderView(vkey);
        return vkey;
    },

    createView : function (modelName,pk,container,conf) {
        var self = this;
        var vConf = conf?conf:self.confs.getConf(modelName,'view',self.role); //new SearchConfs();;
        vConf.langs = self.confs.getLangs();
        var routeType = vConf.routeType ? vConf.routeType : 'view';;
        vConf.container = container;
        var viewClass ="ViewView";

        if (!conf.viewClass) {
            if (vConf.groups) {
                var groupLength = _.keys(vConf.groups).length;
                viewClass = viewClass += 'G' + groupLength;
            }
        } else {
            viewClass = conf.viewClass;
        }

        var vkey = self.controller.addView(viewClass,{
            config : vConf,
            modelName : modelName,
            pk : pk,
            routeParams : {
                model : modelName,
                pk : pk,
                constraintValue : vConf.constraintValue,
                constraintKey : vConf.constraintKey,
            },
            routeType : routeType,
            constraint : vConf.constraint?vConf.constraint:null,
        });

        //self.controller.renderView(vkey);
        return vkey;
    },

    createCsv : function(modelName,providerName,container,conf) {
        var self = this;
        var vConf = conf?conf:self.confs.getConf(modelName,'csv',self.role); //new SearchConfs();;
        var routeType =  vConf.routeType ? vConf.routeType : 'csv';
        vConf.langs = self.confs.getLangs();
        vConf.container = container;
        var viewClass ="ViewCsv";

        if (!conf.viewClass) {
            if (vConf.groups) {
                var groupLength = _.keys(vConf.groups).length;
                viewClass = viewClass += 'G' + groupLength;
            }
        } else {
            viewClass = conf.viewClass;
        }

        vConf.providerName = providerName;
        var vEditKey = self.controller.addView(viewClass,{
            config : vConf,
            modelName : modelName,
            routeParams : {
                model : modelName,
            },
            routeType : routeType
        });
        self.controller.mainViewKey = vEditKey;
        return vEditKey;
        //controller.getView(vEditKey).routeType = 'edit';
        //controller.renderView(vEditKey);
        //self.controllerCsv.renderViews();
    },

    createSearch : function(modelName,container,conf) {
        var self = this;
        var vConf = conf?conf:self.confs.getConf(modelName,'search',self.role); //new SearchConfs();;
        vConf.langs = self.confs.getLangs();
        vConf.container = container;
        var routeType = vConf.routeType ? vConf.routeType : 'search';
        var viewClass = "ViewSearch";

        //UN TROIAIO DA EVENTUALMENTE SISTEMARE MEGLIO PER PANNELLO ADVANCED
        if (!conf.viewClass) {
            if (vConf.groups) {
                var groupLength = _.keys(vConf.groups).length;
                viewClass = viewClass += 'G' + groupLength;
            }
        } else {
            viewClass = conf.viewClass;
        }
        var vkey = self.controller.addView(viewClass,{
            config : vConf,
            modelName : modelName,
            routeParams : {
                model : modelName,
            },
            routeType : routeType
        });

        //self.controller.renderView(vkey);
        return vkey;

    },

    //createInsert : function(modelName,container,conf) {
    createInsert : function(vConf) {
        var self = this;
        return self.createEdit(vConf);
    },

    createCalendar : function(modelName,container,conf) {
        var self = this;
        var vConf = conf?conf:self.confs.getConf(modelName,'calendar',self.role); //new SearchConfs();;
        vConf.langs = self.confs.getLangs();
        vConf.container = container;
        var routeType = vConf.routeType ? vConf.routeType : 'calendar';
        var viewClass ="ViewCalendar";

        if (!conf.viewClass) {
            if (vConf.groups) {
                var groupLength = _.keys(vConf.groups).length;
                viewClass = viewClass += 'G' + groupLength;
            }
        } else {
            viewClass = conf.viewClass;
        }

        var vkey = self.controller.addView(viewClass,{
            config : vConf,
            modelName : modelName,
            routeParams : {
                model : modelName,
            },
            routeType : routeType
        });

        //self.controller.renderView(vkey);
        return vkey;

    },

    createTree : function(modelName,container,conf) {
        var self = this;
        var vConf = conf?conf:self.confs.getConf(modelName,'tree',self.role); //new SearchConfs();;
        vConf.langs = self.confs.getLangs();
        vConf.container = container;
        var routeType = vConf.routeType ? vConf.routeType : 'tree';
        var viewClass ="ViewTree";

        if (!conf.viewClass) {
            if (vConf.groups) {
                var groupLength = _.keys(vConf.groups).length;
                viewClass = viewClass += 'G' + groupLength;
            }
        } else {
            viewClass = conf.viewClass;
        }

        var vkey = self.controller.addView(viewClass,{
            config : vConf,
            modelName : modelName,
            routeParams : {
                model : modelName,
            },
            routeType : routeType
        });

        //self.controller.renderView(vkey);
        return vkey;

    },

    createIframe : function (conf) {
        conf.width = conf.width?conf.width:'100%';
        conf.height = conf.height?conf.height:parseInt(jQuery(window).height()*.85)+'px';
        conf.title = conf.title?conf.title:' ';
        var string = '<iframe style="width:'+conf.width+';height:'+ conf.height +';" src="'+ conf.url +'"></iframe>';
        jQuery('#generalDialog .modal-body').html(string);
        jQuery.generalDialog(null, {title: conf.title, hide_buttons: true});
    },
    createIframeTab : function (conf) {
        var self = this;
        var url = '/ajaxtab/' + conf.modelName;
        url += conf.constraintKey?'/'+conf.constraintKey+"/"+conf.constraintValue:'';
        conf.url = url;
        conf.title = conf.title?conf.title:jQuery.translate('model-'+conf.modelName);
        return self.createIframe(conf);
    },

    createModal : function (model,type,title,attrs,callback) {
        var id = "rand_" + Math.floor((Math.random() * 10000) + 1);
        var viewHtml = '<' + type + ' id="' + id + '" model="' + model + '" ';
        if (attrs) {
            for(var k in attrs) {
                viewHtml += k + '="'+attrs[k]+'" ';
            }
        }

        viewHtml += '></'+type+'>';
        jQuery('#generalDialog .modal-body').html(viewHtml);
        Facade.parse('#generalDialog');
        var titolo = title?title:model;
        jQuery.generalDialog(null,{title: titolo, hide_buttons: true})
        jQuery('#generalDialog').on('hidden.bs.modal', function () {
            var key = Facade.getKeyFromId(id);
            if (key)
                Facade.removeView(key);
            if (callback)
                callback();
        })
    },

    parse : function (container) {
        var self = this;
        self._createController();
        var realContainer = container?container:'body';
        log.debug("Facade.parse " + realContainer);
        var new_keys = [];
        jQuery.each(jQuery(realContainer).find(self.tagNames),function () {
            var key = null;
            switch (jQuery(this).prop('tagName')){
                case 'VIEWLIST':
                    key = self._createList($(this));
                    break;
                case 'VIEWSEARCH':
                    key = self._createSearch($(this));
                    break;
                case 'VIEWEDIT':
                    key = self._createEdit($(this));
                    break;
                case 'VIEWINSERT':
                    key = self._createInsert($(this));
                    break;
                case 'VIEWVIEW':
                    key = self._createView($(this));
                    break;
                case 'VIEWCALENDAR':
                    key = self._createCalendar($(this));
                    break;
                case 'VIEWTREE':
                    key = self._createTree($(this));
                    break;
            }
            new_keys.push(key);
            //jQuery(this).attr('vkey',key);
            self.viewContainers[key] = $(this);
            if (jQuery(this).attr('id'))
                self.viewIds[$(this).attr('id')] = key;
        });
        // connetto solo le view nuove che sono state inserite
        self.connectActions(new_keys);
    },
    /**
     * controlla che se le views hanno delle azioni che le connettano ed esegue
     * le connesioni.
     * @param keys : vettore di chiavi di view
     */
    connectActions : function (keys) {
        var self = this;
        log.debug('connect actions',keys);
        for(var i in keys) {
            var vKey = keys[i];
            log.debug('check ' + vKey + " connetctions");
            var connect_actions = self.viewContainers[vKey].attr('connect_actions') ? self.viewContainers[vKey].attr('connect_actions') : null;
            if (!connect_actions)
                continue;

            connect_actions = JSON.parse(connect_actions);
            log.debug('found ',connect_actions);
            //console.log('ACCCCCCIONSTTTSSS',connect_actions);
            for (var a in connect_actions) {
                var id = connect_actions[a];
                console.log('id',id,'a',a,self.viewIds[''+id]);
                if (self.viewIds[''+id]) {
                    console.log("connect",vKey,'to',{key:self.viewIds[id],action:a});
                    self.controller.connectView(vKey,{key:self.viewIds[id],action:a});
                }
            }
            //controller.connectView(vSearchKey,{key : vListKey,action:'search'});
        }
    },
    parseRender : function (container,callback) {
        var self = this;
        log.debug("Facade.parseRender");
        container = container?container:'body';
        $.each($(container).find('render'),function () {
            var attrs = self._getRenderAttributes($(this));
            self.renders[attrs.key] = Render.factory(attrs.key,attrs,attrs.type);
            self.renders[attrs.key].render();
            self.renders[attrs.key].finalize();
        })
        if (callback)
            callback()
    },
    _createList : function (jQe) {
        var self = this;
        var viewConf = self._getStandardAttributes(jQe,'list');
        viewConf.vConf.pagination =jQe.attr('pagination')?JSON.parse(jQe.attr('pagination')):true;
        var vkey = self.createList(viewConf);
        if (viewConf.autorender)
            self.controller.renderView(vkey);
        jQe.attr('vkey',vkey);
        return vkey;
    },
    _createSearch : function (jQe) {
        var self = this;
        var attr = self._getStandardAttributes(jQe,'search');
        var vkey = self.createSearch(attr.model,jQe,attr.vConf);
        if (attr.autorender)
            self.controller.renderView(vkey);
        jQe.attr('vkey',vkey);
        return vkey;
    },
    _createInsert: function(jQe) {
        var self = this;
        var viewConf = self._getStandardAttributes(jQe,'insert');
        var vkey = self.createInsert(viewConf);
        if (viewConf.autorender)
            self.controller.renderView(vkey);
        jQe.attr('vkey',vkey);
        return vkey;
    },
    _createEdit : function (jQe) {
        var self = this;
        var viewConf = self._getStandardAttributes(jQe,'edit');
        var vkey = self.createEdit(viewConf);
        if (viewConf.autorender)
            self.controller.renderView(vkey);
        jQe.attr('vkey',vkey);
        return vkey;
    },

    _createView : function (jQe) {
        var self = this;
        var attr = self._getStandardAttributes(jQe,'view');
        attr.vConf.container = jQe;
        var viewClass ="ViewView";
        if (attr.vConf.groups) {
            var groupLength = _.keys(attr.vConf.groups).length;
            attr.vConf.templateId = '#default_view_edit_group'+groupLength+'_tpl';
            viewClass ='ViewViewG'+groupLength;
        }
        var viewConfig = {
            config: attr.vConf,
            modelName: attr.model,
            routeParams: {
                model: attr.model,
                pk : attr.pk
            },
            pk : attr.pk
        };
        var vkey = self.controller.addView(viewClass,viewConfig);
        if (attr.autorender)
            self.controller.renderView(vkey);
        jQe.attr('vkey',vkey);
        return vkey;
    },
    _createCalendar : function (jQe) {
        var self = this;
        var attr = self._getStandardAttributes(jQe,'calendar');
        attr.vConf.container = jQe;
        var viewClass ="ViewCalendar";
        var viewConfig = {
            config: attr.vConf,
            modelName: attr.model,
            routeParams: {
                model: attr.model,
                pk : attr.pk
            },
            pk : attr.pk
        };
        var vkey = self.controller.addView(viewClass,viewConfig);
        if (attr.autorender)
            self.controller.renderView(vkey);
        jQe.attr('vkey',vkey);
        return vkey;
    },
    _createTree : function (jQe) {
        var self = this;
        var attr = self._getStandardAttributes(jQe,'tree');
        attr.vConf.container = jQe;
        var viewClass ="ViewTree";
        var viewConfig = {
            config: attr.vConf,
            modelName: attr.model,
            routeParams: {
                model: attr.model,
                pk : attr.pk
            },
            pk : attr.pk
        };
        var vkey = self.controller.addView(viewClass,viewConfig);
        if (attr.autorender)
            self.controller.renderView(vkey);
        jQe.attr('vkey',vkey);
        return vkey;
    },
    _getStandardAttributes: function(jQe,type) {
        var self = this;
        var attr = {};
        attr.model = jQe.attr('model');
        attr.container = jQe;
        attr.vConf = jQe.attr('conf')?jQe.attr('conf'):null;
        if (attr.vConf) {
            log.debug(attr.model + ' loading custom conf ' + attr.vConf);
            attr.vConf = new window[attr.vConf]();
        } else
            attr.vConf = self.confs.getConf(attr.model,type,self.role); //new SearchConfs();
        attr.vConf.custom = jQe.attr('custom')?jQe.attr('custom'):null;
        attr.vConf.customTemplate = jQe.attr('customTemplate')?jQe.attr('customTemplate'):null;
        attr.pk = jQe.attr('pk')?jQe.attr('pk'):null;
        attr.vConf.langs = self.confs.langs?self.confs.langs:['it'];
        attr.vConf.constraintKey = jQe.attr("constraintKey")?jQe.attr("constraintKey"):null;
        attr.vConf.constraintValue = jQe.attr("constraintValue")?jQe.attr("constraintValue"):null;
        attr.autorender = jQe.attr('autorender')?JSON.parse(jQe.attr('autorender')):true;
        attr.afterRender = jQe.attr('afterRender')?JSON.parse(jQe.attr('afterRender')):null;
        attr.vConf.constraint=attr.vConf.constraintKey && attr.vConf.constraintValue?'Constraint':null;
        attr.vConf.routeType = jQe.attr('routeType')?jQe.attr('routeType'):null;
        attr.vConf.prefixTemplateClass = jQe.attr('prefixTemplateClass')?jQe.attr('prefixTemplateClass'):null;
        attr.viewClass = jQe.attr('viewClass')?jQe.attr('viewClass'):null;
        //attr.vConf.
        if (jQe.attr('actions')) {
            attr.vConf.actions = jQe.attr('actions').split(",");
        }
        log.debug('Facade._getStandardAttributes',attr);
        return attr;
    },

    _getRenderAttributes : function (jQe) {
        var attr = {};
        attr.key = jQe.attr('key');
        attr.type = jQe.attr('type');
        attr.container = '#'+ jQe.attr('id');
        attr.mode = 'edit';
        var conf = jQe.attr('conf')?window[jQe.attr('conf')]:{};
        attr = _.extendOwn(attr,conf);
        return attr;
    },
    _createController : function () {
        var self = this;
        if (!self.controller)
            self.controller = new Controller();
    },
    /**
     * crea il prefisso in caso il sito venga ospitato in una sottocartella dell'host principale
     *
     * @param baseUrl
     */
    setBaseUrl : function (baseUrl) {
        this.baseUrl = baseUrl;
    },

    getUrl : function(url) {
       return this.baseUrl + url;
    }


}

// INIZIALIZZAZIONE FACADE

Facade.init();

//# sourceMappingURL=cupparis3.js.map

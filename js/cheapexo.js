    function movetoNext(current, nextFieldID) {  
    if (current.value.length >= current.maxLength) {  
    $("#nextFieldID").focus();  
    }  
    }
    /*====================================================*/
    function clean_display(){
        $('#from_main_div').text('');
        $('#to_main_div').text('')
    }
    /*====================================================*/
    function setHeader(xhr) {
        xhr.setRequestHeader('apikey', 'oq08oIlWagyVUx7KkfvpRxVO2rqSaIPW')        
    }
    /*====================================================*/
    function from_display(locations){
        $('#from_main_div').append("<div class='head'>Popular Airports<div class='clip'></div></div>");
        $.each(locations, function(i, item) {
            $('#from_main_div').append(                  
                '<div class="from" onClick="select(\'' + item.id + '-'+ item.city.name + '\')">'+
                '<a>'+ (item.id)+'-'+(item.city.name)+'</a>'+                  
                '<span>'+(item.name)+'</span>'+ 
                '</div>'
            );
        });
      
    }
    /*====================================================*/
    function to_display(locations){
        $('#to_main_div').append("<li class='head'>Popular Airports<span class='clip'></span></li>");
        $.each(locations, function(i, item) {
          $('#to_main_div').append  (                  
            '<div class="from" onClick="toselect(\'' + item.id + '-'+ item.city.name + '\')">'+
            '<a>'+ (item.id)+'-'+(item.city.name)+'</a>'+                  
            '<span>'+(item.name)+'</span>'+ 
            '</div>'
          );
      });
    }
    /*====================================================*/
    
    function get_locations(code){
      $.ajax({ 
                 type: "GET",
                 dataType: "json",
                 beforeSend: setHeader,
                 url: "https://kiwicom-prod.apigee.net/locations/query?term="+code+"&locale=en-US&location_types=airport&limit=5&active_only=true&sort=-name",
    
                 success: function(data){ 
                 var locations=data['locations']
                 if(locations){
                  from_display(locations)
                 }
                
                }
             });
    }
    /*====================================================*/
    function to_locations(code){
      $.ajax({ 
                 type: "GET",
                 dataType: "json",
                 beforeSend: setHeader,
                 url: "https://kiwicom-prod.apigee.net/locations/query?term="+code+"&locale=en-US&location_types=airport&limit=5&active_only=true&sort=-name",
    
                 success: function(data){ 
                 var locations=data['locations']
                 if(locations){
                  to_display(locations)
                 }
                
                }
           });    
    }     
    /*====================================================*/
    function select(dddat) {
      $('input[id=from]').val(dddat);
      var code = dddat.substring(0, 3);
      $('input[id=from_airport_id]').val(code);
      element=document.getElementById("from_main_div");
      element.style.display = "none";
      $("#to").focus();
      $("#to").click();
    }
    /*====================================================*/
    function toselect(dddat) {
      $('input[id=to]').val(dddat);
      var code = dddat.substring(0, 3);
      $('input[id=to_airport_id]').val(code);
      element=document.getElementById("to_main_div");
      element.style.display = "none";
      $("#example").focus();
    }    
    
    /*##############################################################################*/
      $('#from').on('click',function(){
        val = $('#from_airport_id').val();
        if(val){
          clean_display();
          get_locations(val);
          $('#from_main_div').css({'display':'block'});
          //element=document.getElementById("from_city");
          //element.style.display = "block";
        }
        else{
          clean_display();
          val = 'del';
          get_locations(val);
        }
        $('#from_main_div').css('display','block');
      });
      /*====================================================*/
      $('#to').on('click',function(){
        val = $('#to_airport_id').val();
        if(val){
          clean_display();
          to_locations(val);
          $('#to_main_div').css({'display':'block'});
          //element=document.getElementById("to_city");
          //element.style.display = "block";
        }
        else{
          clean_display();
          val = 'lko';
          to_locations(val);
        }
        $('#to_main_div').css({'display':'block'});
      });
    
    /*====================================================*/
    $('#from').on('keyup',function(){
      val = $(this).val();
       if(val){
          clean_display();
          get_locations(val);
          $('#from_main_div').css({'display':'block'});
          //element=document.getElementById("from_city");
          //element.style.display = "block";
        }
        else{
          clean_display();
          val = 'del';
        
          get_locations(val);
        }
        $('#from_main_div').css('display','block');
        
      });
    /*====================================================*/
      $('#to').on('keyup',function(){
         val = $(this).val();
        if(val){
          clean_display();
          to_locations(val);
          $('#to_main_div').css({'display':'block'});
          //element=document.getElementById("to_city");
          //element.style.display = "block";
        }
        else{
          clean_display();
          val = 'lko';
        
          to_locations(val);
        }
        $('#to_main_div').css({'display':'block'});
      
        
      });
            
    /*====================================================*/


    $('body').click(function(evt){    
      if(evt.target.id == "from"){
        //alert('from');
        return;
      }
        
      else if(evt.target.id == "to"){
        //alert('from');
        return;
      }

      else if(evt.target.id == "user-more-info"){
        alert('from');
        return;
      }

      
      else if(evt.target.id == "custombox"){
        alert('from');
        return;
      }

      else{
        clean_display();
        return;
      }
    
    });

/*====================================================*/


    function getFlightList(code){
      $.ajax({ 
           type: "GET",
           dataType: "json",
           beforeSend: setHeader,
           url: "https://kiwicom-prod.apigee.net/v2/search?fly_from=DEL&fly_to=HYD&date_from=11/11/2019&date_to=12/12/2019&selected_cabins=M&flight_type=oneway&&fly_days=[0,1,2,3,4,5,6]&fly_days_type=departure&ret_fly_days=[0,1,2,3,4,5,6]&ret_fly_days_type=departure&one_for_city=0&only_working_days=0&only_weekends=0&one_per_date=0&direct_flights=0&locale=en&partner=picky&partner_market=IN&stopover_from=00:00&stopover_to=00:00&select_stop_airport=HYD,BOM&select_stop_airport_exclude=False&curr=INR&select_airlines=AI,6E,I5,RA,SG,UK,G8,IX,BA,QR,EK,LH&asc=0&limit=10",
      
           success: function(respdata){ 
           var locations=respdata
           // console.log(respdata);

           if(locations){
            //alert('if')
            displayFlightList(locations.data)
           }
         
          }
      });
    }

/*=====================Search_button===============================*/ 
    $('#submit').on('click',function(){
      getFlightList('DEL');
    });
      

/*=====================Display_data===============================*/  
    var count = 1;   
    function displayFlightList(locations){
      $.each(locations, function(i, item) {
        console.log(locations);
        dataAir={
                "U2": "easyjet",

                "1T": "Bulgarian Air Charter",
                "Q5": "40-Mile Air",
                "4O": "Interjet",
                "7A": "Express Air Cargo",
                "JY": "Air Turks and Caicos",
                "JU": "Air Serbia",
                "QH": "Kyrgyzstan",
                "A8": "Benin Golf Air",
                "RV": "Caspian Airlines",
                "1B": "Abacus International",
                "W9": "Eastwind Airlines",
                "6U": "Air Ukraine",
                "E4": "Aero Asia International",
                "ZI": "Aigle Azur",
                "AE": "Mandarin Airlines",
                "OZ": "Ozark Air Lines",
                "8U": "Afriqiyah Airways",
                "Q9": "Afrinat International Airlines",
                "KI": "Adam Air",
                "QB": "Georgian National Airlines",
                "LD": "Air Hong Kong",
                "UX": "Air Europa",
                "NX": "Air Macau",
                "ZV": "Air Midwest",
                "HM": "Air Seychelles",
                "AF": "Air France",
                "SB": "Air Caledonie International",
                "EH": "SAETA",
                "ZW": "Air Wisconsin",
                "GN": "Air Gabon",
                "NQ": "Air Japan",
                "VD": "SwedJet Airways",
                "TT": "Tigerair Australia",
                "4N": "Air North Charter - Canada",
                "NZ": "Eagle Airways",
                "QM": "Air Malawi",
                "ML": "Midway Airlines (1976–1991)",
                "P8": "Pantanal Linhas Aéreas",
                "BM": "BMI Regional",
                "ZX": "Air Georgian",
                "G8": {
                  "Airline_Name":"Go Air",
                  "logo":"D:/Ankit/cheapexo/cheapexo/images/airlines/goair.png"
                      },
                "7T": "Tobruk Air",
                "6V": "Mars RK",
                "NH": "All Nippon Airways",
                "TZ": "ATA Airlines",
                "2Q": "Air Cargo Carriers",
                "V7": "Volotea",
                "AB": "Air Berlin",
                "4D": "Air Sinai",
                "QN": "Air Armenia",
                "AI": {
                  "Airline_Name":"Air India",
                  "logo":"D:/Ankit/cheapexo/cheapexo/images/airlines/airindia.png"
                      },
                "PJ": "Air Saint Pierre",
                "SZ": "Air Southwest",
                "8C": "Shanxi Airlines",
                "NF": "Air Vanuatu",
                "ZB": "Monarch Airlines",
                "CC": "Macair Airlines",
                "RB": "Syrian Arab Airlines",
                "TN": "Air Tahiti Nui",
                "SW": "Air Namibia",
                "AW": "Dirgantara Air Service",
                "PE": "People's Viennaline",
                "JM": "Jetstar Hong Kong Airways",
                "6G": "Air Wales",
                "TX": "Transportes Aéreos Nacionales",
                "IX": "Air India Express",
                "BT": "Air Baltic",
                "EL": "Ellinair",
                "YW": "Air Nostrum",
                "PX": "Air Niugini",
                "G9": "Air Arabia",
                "AC": "Air Canada",
                "AP": "Air One",
                "XT": "SkyStar Airways",
                "UM": "Air Zimbabwe",
                "S2": "Air Sahara",
                "TC": "Air Tanzania",
                "2J": "Air Burkina",
                "KM": "Air Malta",
                "YT": "Air Togo",
                "G4": "Allegiant Air",
                "M3": "North Flying",
                "O4": "Antrak Air",
                "GB": "ABX Air",
                "8V": "Wright Air Service",
                "8T": "Air Tindi",
                "JP": "Adria Airways",
                "A3": "Aegean Airlines",
                "2K": "Aerogal",
                "KD": "KD Avia",
                "KO": "Alaska Central Express",
                "VX": "Virgin America",
                "KH": "Aloha Air Cargo",
                "AA": "American Airlines",
                "AX": "Trans States Airlines",
                "AN": "Ansett Australia",
                "5W": "Astraeus",
                "VV": "Aerosvit Airlines",
                "WK": "Edelweiss Air",
                "QQ": "Reno Air",
                "FG": "Ariana Afghan Airlines",
                "Y2": "Flyglobespan",
                "SU": "Aeroflot Russian Airlines",
                "5Z": "VivaColombia",
                "5D": "DonbassAero",
                "1A": "Amadeus IT Group",
                "JJ": "LATAM Brasil",
                "PL": "Airstars",
                "8A": "Atlas Blue",
                "GD": "Air Alpha Greenland",
                "HT": "Aeromist-Kharkiv",
                "J2": "Azerbaijan Airlines",
                "U3": "Avies",
                "4Y": "Yute Air Alaska",
                "5A": "Alpine Air Express",
                "W4": "Aero Services Executive",
                "IZ": "Arkia Israel Airlines",
                "M6": "Amerijet International",
                "4A": "Air Kiribati",
                "EV": "ExpressJet",
                "HP": "Phoenix Airways",
                "VH": "Aeropostal Alas de Venezuela",
                "AM": "Aeroméxico",
                "TL": "Trans Mediterranean Airlines",
                "OY": "Omni Air International",
                "IW": "Wings Air",
                "J6": "AVCOM",
                "2D": "Aero VIP",
                "VB": "VIVA Aerobus",
                "OE": "Asia Overnight Express",
                "GV": "Aero Flight",
                "JW": "Vanilla Air",
                "2B": "Aerocondor",
                "4C": "Aires, Aerovías de Integración Regional, S.A.",
                "AR": "Aerolíneas Argentinas",
                "AS": "Alaska Airlines, Inc.",
                "OB": "Oasis International Airlines",
                "HC": "Iceland Express",
                "FO": "Airlines of Tasmania",
                "OS": "Austrian Airlines",
                "IQ": "Augsburg Airways",
                "RU": "SkyKing Turks and Caicos Airways",
                "MO": "Calm Air",
                "GR": "Gemini Air Cargo",
                "NO": "Neos",
                "AU": "Austral Líneas Aéreas",
                "AO": "Australian Airlines",
                "AV": "Avianca - Aerovías del Continente Americano S.A.",
                "A0": "Avianca Argentina",
                "O6": "Avianca Brazil",
                "K8": "Airlink Zambia",
                "B9": "Air Bangladesh",
                "HJ": "Hellas Jet",
                "AK": "Air Bridge Carriers",
                "D7": "FlyAsianXpress",
                "DJ": "Polynesian Blue",
                "I5": {
                  "Airline_Name":"Air Asia",
                  "logo":"D:/Ankit/cheapexo/cheapexo/images/airlines/airasia.png"
                      },
                "EX": "Air Santo Domingo",
                "3G": "Atlant-Soyuz Airlines",
                "AZ": "Alitalia",
                "ZE": "Líneas Aéreas Azteca",
                "A2": "Cielos Airlines",
                "R7": "Aserca Airlines",
                "RX": "Aviaexpress",
                "MQ": "American Eagle Airlines",
                "ZS": "Sama Airlines",
                "FF": "Airshop",
                "VU": "Air Ivoire",
                "BP": "Air Botswana",
                "GS": "Tianjin Airlines",
                "VT": "Air Tahiti",
                "3N": "Air Urga",
                "VL": "Air VIA",
                "FK": "Keewatin Air",
                "G2": "Avirex",
                "V8": "Iliamna Air Taxi",
                "K6": "Khalifa Airways",
                "VE": "C.A.I. Second",
                "V5": "Royal Aruban Airlines",
                "CA": "Air China",
                "Q6": "Aero Condor Peru",
                "5F": "Fly One",
                "QC": "Air Corridor",
                "NV": "Air Central",
                "CV": "Cargolux",
                "CW": "Air Marshall Islands",
                "ZA": "Interavia Airlines",
                "AH": "Air Algérie",
                "ER": "Astar Air Cargo",
                "HO": "Juneyao Airlines",
                "EN": "Air Dolomiti",
                "NM": "Mount Cook Airlines",
                "EE": "Aero Airlines",
                "4F": "Air City",
                "EI": "Aer Lingus",
                "E8": "Alpi Eagles",
                "KY": "Air São Tomé and Príncipe",
                "PC": "Pegasus Airlines",
                "OF": "Transports et Travaux Aériens de Madagascar",
                "FJ": "Fiji Airways",
                "RC": "Atlantic Airways",
                "NY": "Air Iceland",
                "2P": "Air Philippines",
                "2U": "Air Guinee Express",
                "0A": "Amber Air",
                "DA": "Air Georgia",
                "GL": "Miami Air International",
                "LL": "Allegro",
                "5Y": "Atlas Air",
                "GG": "Cargo 360",
                "H9": "Izair",
                "HD": "AIRDO",
                "IP": "Atyrau Air Ways",
                "QK": "Air Canada Jazz",
                "KK": "Atlasjet",
                "JS": "Air Koryo",
                "KC": "Air Astana",
                "LV": "Albanian Airlines",
                "3S": "Air Guyane Express",
                "D4": "Alidaunia",
                "9I": "Thai Sky Airlines",
                "XL": "Aerolane",
                "A6": "Hongtu Airlines",
                "TD": "Tulip Air",
                "L8": "Air Luxor GB",
                "LK": "Air Luxor",
                "MK": "Air Mauritius",
                "MD": "Air Madagascar",
                "9U": "Air Moldova",
                "L9": "Teamline Air",
                "A7": "Air Plus Comet",
                "QO": "Origin Pacific Airways",
                "MR": "Air Mauritanie",
                "F4": "Albarka Air",
                "AJ": "Aero Contractors",
                "8Y": "China Postal Airlines",
                "OT": "Aeropelican Air Services",
                "AD": "Azul Linhas Aéreas Brasileiras",
                "QD": "Air Class Líneas Aéreas",
                "QS": "Travel Service",
                "AG": "",
                "MC": "Air Mobility Command",
                "RE": "Stobart Air",
                "UU": "Air Austral",
                "ZP": "Silk Way Airlines",
                "6K": "Asian Spirit",
                "A5": "Hop!",
                "QL": "Línea Aérea de Servicio Ejecutivo Regional",
                "R3": "Yakutia Airlines",
                "MV": "Armenian International Airways",
                "2O": "Air Salone",
                "U8": "Armavia",
                "BQ": "Baltia Air Lines",
                "P5": "AeroRepública",
                "BF": "Bluebird Cargo",
                "5L": "AeroSur",
                "JR": "Aero California",
                "Z3": "Avient Aviation",
                "GM": "Air Slovakia",
                "VW": "Aeromar",
                "OR": "TUI Airlines Netherlands",
                "CG": "Airlines PNG",
                "TY": "Iberworld",
                "FL": "AirTran Airways",
                "TS": "Air Transat",
                "EC": "Avialeasing Aviation Company",
                "DW": "Aero-Charter Ukraine",
                "U7": "USA Jet Airlines",
                "6R": "Alrosa Air Company",
                "6A": "Aviacsa",
                "JZ": "Skyways Express",
                "AQ": "MAP-Management and Planung",
                "3J": "Zip",
                "SM": "Swedline Express",
                "KJ": "British Mediterranean Airways",
                "BX": "Coast Air",
                "YE": "Aryan Cargo Express",
                "VJ": "Vietjet Air",
                "3O": "Air Arabia Maroc",
                "X9": "Avion Express",
                "JD": "Beijing Capital Airlines",
                "ID": "Interlink Airlines",
                "BA": "British Airways",
                "BG": "Biman Bangladesh Airlines",
                "B4": "Bankair",
                "WX": "CityJet",
                "BZ": "Keystone Air Service",
                "JA": "JetSMART",
                "J4": "Jordan International Air Cargo",
                "8H": "BH Air",
                "4T": "Belair Airlines",
                "UP": "Bahamasair",
                "E6": "Bringer Air Cargo Taxi Aéreo",
                "LZ": "Balkan Bulgarian Airlines",
                "TH": "Transmile Air Services",
                "BS": "British International Helicopters",
                "PG": "Bangkok Airways",
                "KF": "Blue1",
                "JV": "Bearskin Lake Air Service",
                "B3": "Bellview Airlines",
                "BD": "BMI",
                "WW": "WOW air",
                "CH": "Bemidji Airlines",
                "BO": "Bouraq Indonesia Airlines",
                "BV": "Blue Panorama Airlines",
                "7R": "BRA-Transportes Aéreos",
                "8E": "Bering Air",
                "B2": "Belavia Belarusian Airlines",
                "BN": "Horizon Airlines",
                "GQ": "Big Sky Airlines",
                "V9": "Star1 Airlines",
                "Y6": "Batavia Air",
                "BU": "Buryat Airlines Aircompany",
                "J8": "Berjaya Air",
                "QW": "Blue Wings",
                "SN": "Brussels Airlines",
                "DB": "Brit Air",
                "E9": "Boston-Maine Airways",
                "NT": "Binter Canarias",
                "0B": "Blue Air",
                "FB": "Bulgaria Air",
                "8N": "Barents AirLink",
                "CJ": "CityFlyer Express",
                "YB": "Borajet",
                "BW": "Caribbean Airlines",
                "7N": "PAWA Dominicana",
                "5C": "CAL Cargo Air Lines",
                "3C": "RegionsAir",
                "R9": "Camai Air",
                "UY": "Cameroon Airlines",
                "C6": "CanJet",
                "CP": "Compass Airlines",
                "5T": "Canadian North",
                "W2": "Canadian Western Airlines",
                "9K": "Cape Air",
                "PT": "West Air Sweden",
                "2G": "Cargoitalia",
                "W8": "Cargojet Airways",
                "C8": "Chicago Express Airlines",
                "8B": "Caribbean Star Airlines",
                "V3": "Carpatair",
                "CX": "Cathay Pacific",
                "KX": "Cayman Airways",
                "5J": "Cebu Pacific",
                "3B": "Central Connect Airlines",
                "9M": "Central Mountain Air",
                "J7": "ValuJet Airlines",
                "WE": "Thai Smile Airways",
                "OP": "Chalk's International Airlines",
                "MG": "Champion Air",
                "2Z": "Chang An Airlines",
                "S8": "Skywise Airline",
                "CI": "China Airlines",
                "CK": "China Cargo Airlines",
                "MU": "China Eastern Airlines",
                "G5": "China Express Airlines",
                "WH": "WebJet Linhas Aéreas",
                "CZ": "China Southern Airlines",
                "KN": "China United Airlines",
                "XO": "LTE International Airways",
                "3Q": "China Yunnan Airlines",
                "X7": "Chitaavia",
                "QI": "Cimber Sterling",
                "C7": "Rico Linhas Aéreas",
                "C9": "Cirrus Airlines",
                "CF": "City Airline",
                "G3": "Gol Transportes Aéreos",
                "CT": "Civil Air Transport",
                "6P": "Club Air",
                "DQ": "Coastal Air",
                "9L": "Colgan Air",
                "YD": "Cologne Air Transport GmbH",
                "OH": "PSA Airlines",
                "MN": "Comair",
                "C5": "CommutAir",
                "KR": "Comores Airlines",
                "GJ": "Eurofly",
                "DE": "Condor Flugdienst",
                "CO": "Continental Express",
                "CS": "Continental Micronesia",
                "V0": "Conviasa",
                "CM": "Copa Airlines",
                "CQ": "Sunshine Express Airlines",
                "XC": "Corendon Airlines",
                "CD": "Corendon Dutch Airlines",
                "SS": "Corsairfly",
                "XK": "Corse Méditerranée",
                "F5": "Cosmic Air",
                "OU": "Croatia Airlines",
                "7C": "Jeju Air",
                "QE": "Crossair Europe",
                "CU": "Cubana de Aviación",
                "CY": "Cyprus Airways",
                "YK": "Cyprus Turkish Airlines",
                "OK": "Czech Airlines",
                "8L": "Redhill Aviation",
                "XG": "Clickair",
                "WD": "WDL Aviation",
                "DX": "DAT Danish Air Transport",
                "ES": "DHL International",
                "L3": "LTU Austria",
                "D3": "Daallo Airlines",
                "N2": "Kabo Air",
                "H8": "Dalavia",
                "0D": "Darwin Airline",
                "D5": "Dauair",
                "DL": "Delta Air Lines",
                "2A": "Deutsche Bahn",
                "1I": "Sky Trek International Airlines",
                "DH": "Independence Air",
                "Z6": "Dniproavia",
                "YU": "Dominair",
                "DO": "Dominicana de Aviación",
                "E3": "Domodedovo Airlines",
                "D9": "Donavia",
                "KA": "Dragonair, Hong Kong Dragon Airlines",
                "KB": "Druk Air",
                "DI": "Dba",
                "9A": "Eagle Express Air Charter",
                "E1": "Everbread",
                "1C": "Electronic Data Systems",
                "1Y": "Electronic Data Systems",
                "BR": "EVA Air",
                "EY": "Etihad Airways",
                "H7": "Eagle Air",
                "QU": "Uganda Airlines",
                "S9": "East African Safari Air",
                "EA": "European Air Express",
                "T3": "Eastern Airways",
                "QF": "Sunstate Airlines",
                "DK": "Eastland Air",
                "MS": "Egyptair",
                "LY": "El Al Israel Airlines",
                "UZ": "El-Buraq Air Transport",
                "EK": "Emirates Airlines",
                "EM": "Empire Airlines",
                "EU": "Empresa Ecuatoriana De Aviación",
                "E0": "Eos Airlines",
                "B8": "Eritrean Airlines",
                "E7": "European Aviation Air Charter",
                "OV": "SalamAir",
                "ET": "Ethiopian Airlines",
                "RZ": "Euro Exec Express",
                "MM": "SAM Colombia",
                "UI": "Eurocypria Airlines",
                "K2": "Eurolot",
                "3W": "Euromanx Airways",
                "5O": "Europe Airpost",
                "QY": "European Air Transport",
                "EW": "Eurowings",
                "EZ": "Sun Air of Scandinavia",
                "JN": "Excel Airways",
                "MB": "MNG Airlines",
                "OW": "Executive Airlines",
                "EO": "Hewa Bora Airways",
                "U2": "United Feeder Service",
                "DS": "easyJet Switzerland",
                "IH": "Irtysh Air",
                "EF": "Far Eastern Air Transport",
                "FD": "Thai AirAsia",
                "F6": "FaroeJet",
                "F3": "Faso Airways",
                "FX": "Federal Express",
                "N8": "National Air Cargo dba National Airlines",
                "4S": "Finalair Congo",
                "AY": "Finnair",
                "FC": "Finncomm Airlines",
                "FY": "Northwest Regional Airlines",
                "7F": "First Air",
                "DP": "First Choice Airways",
                "8F": "Fischer Air",
                "8D": "Servant Air",
                "B5": "Flightline",
                "PA": "Pan American World Airways",
                "RF": "Florida West International Airways",
                "F2": "Fly Air",
                "OJ": "Overland Airways",
                "SH": "Fly Me Sweden",
                "TE": "Skytaxi",
                "LF": "FlyNordic",
                "F7": "Flybaboo",
                "BE": "Flybe",
                "W3": "Switfair Cargo",
                "VY": "Vueling Airlines",
                "HK": "Four Star Aviation / Four Star Cargo",
                "FH": "Futura International Airways",
                "SJ": "Freedom Air",
                "FP": "Servicios Aéreos de los Andes",
                "F9": "Frontier Airlines",
                "2F": "Frontier Flying Service",
                "FZ": "Flydubai",
                "9Y": "Fly Georgia",
                "VK": "Virgin Nigeria Airways",
                "GX": "Pacificair",
                "Y5": "Pace Airlines",
                "GT": "GB Airways",
                "Z5": "GMG Airlines",
                "7O": "Galaxy Air",
                "1G": "Galileo International",
                "GC": "Gambia International Airlines",
                "G7": "GoJet Airlines",
                "GA": "Garuda Indonesia",
                "4G": "Gazpromavia",
                "A9": "Georgian Airways",
                "ST": "Germania",
                "4U": "Germanwings",
                "GP": "Palau Trans Pacific Airlines",
                "GH": "Ghana Airways",
                "G0": "Ghana International Airlines",
                "GK": "JetStar Japan",
                "DC": "Golden Air",
                "G1": "Gorkha Airlines",
                "ZK": "Great Lakes Airlines",
                "IJ": "Spring Airlines Japan",
                "G6": "Air Volga",
                "J9": "Jazeera Airways",
                "GF": "Gulf Air Bahrain",
                "GY": "Tri-MG Intra Asia Airlines",
                "H6": "Hageland Aviation Services",
                "HR": "Hahn Air",
                "HU": "Hainan Airlines",
                "1R": "Hainan Phoenix Information Systems",
                "2T": "Haiti Ambassador Airlines",
                "4R": "Hamburg International",
                "X3": "Hapag-Lloyd Express (TUIfly)",
                "HF": "Hapagfly",
                "HB": "Harbor Airlines",
                "HQ": "Thomas Cook Airlines",
                "HA": "Hawaiian Airlines",
                "BH": "Hawkair",
                "HN": "Heavylift Cargo Airlines",
                "JB": "Helijet",
                "ZU": "Helios Airways",
                "HW": "North-Wright Airways",
                "2L": "Helvetic Airways",
                "UD": "Hex'Air",
                "5K": "Hi Fly",
                "H5": "Mavial Magadan Airlines",
                "HX": "Hong Kong Airlines",
                "RH": "Republic Express Airlines",
                "UO": "Hong Kong Express Airways",
                "HH": "Hope Air",
                "QX": "Horizon Air",
                "H4": "Inter Island Airways",
                "IK": "Lankair",
                "II": "IBC Airways",
                "0C": "IBL Aviation",
                "C3": "Independent Carrier (ICAR)",
                "1F": "INFINI Travel Information",
                "1U": "Polyot Sirena",
                "IB": "Iberia Airlines",
                "I2": "Iberia Express",
                "FW": "Ibex Airlines",
                "FI": "Icelandair",
                "6E": {
                  "Airline_Name":"Indgo",
                  "logo":"D:/Ankit/cheapexo/cheapexo/images/airlines/indigo.png"
                    },
                "UK": {
                  "Airline_Name":"Vistara",
                  "logo":"D:/Ankit/cheapexo/cheapexo/images/airlines/vistara.png"
                    },
                "IC": "Indian Airlines",
                "I9": "Indigo Airlines",
                "QZ": "Indonesia AirAsia",
                "IO": "Indonesian Airlines",
                "D6": "Interair South Africa",
                "RS": "Sky Regional Airlines",
                "6I": "International Business Air",
                "3L": "Intersky",
                "I4": "Interstate Airlines",
                "IR": "Iran Air",
                "EP": "Iran Aseman Airlines",
                "IA": "Iraqi Airways",
                "2S": "Satgur Air Transport",
                "CN": "Westward Airways",
                "IF": "Islas Airways",
                "WC": "Islena De Inversiones",
                "6H": "Israir",
                "FS": "Servicios de Transportes Aéreos Fueguinos",
                "GI": "Itek Air",
                "XM": "J-Air",
                "JC": "JAL Express",
                "JO": "Jettime",
                "MT": "Thomas Cook Airlines",
                "1M": "JSC Transport Automated Information Systems",
                "JI": "Midway Airlines (1993–2003)",
                "3X": "Japan Air Commuter",
                "JL": "Japan Airlines Domestic",
                "EG": "Japan Asia Airways",
                "NU": "Japan Transocean Air",
                "O2": "Linear Air",
                "9W": "Jet Airways",
                "QJ": "Jet Airways",
                "PP": "Jet Aviation",
                "3K": "Jetstar Asia Airways",
                "LS": "Jet2.com",
                "B6": "JetBlue Airways",
                "JF": "L.A.B. Flying Service",
                "0J": "Jetclub",
                "SG": {"Airline_Name":"Spice Jet","logo":"D:/Ankit/cheapexo/cheapexo/images/airlines/spicejet.png"},
                "JQ": "Jetstar Airways",
                "JX": "Jett8 Airlines Cargo",
                "R5": "Malta Air Charter",
                "6J": "Skynet Asia Airways",
                "KW": "Wataniya Airways",
                "WA": "Western Airlines",
                "KL": "KLM",
                "K4": "Kalitta Air",
                "K9": "Krylo Airlines",
                "RQ": "Kam Air",
                "E2": "Rio Grande Air",
                "V2": "Vision Airlines",
                "KV": "Kavminvodyavia",
                "M5": "Kenmore Air",
                "KQ": "Kenya Airways",
                "IT": "Tigerair Taiwan",
                "Y9": "Kish Air",
                "KP": "Kiwi International Air Lines",
                "7K": "Kogalymavia Air Company",
                "8J": "Komiinteravia",
                "KE": "Korean Air",
                "7B": "Krasnojarsky Airlines",
                "GW": "SkyGreece Airlines",
                "KU": "Kuwait Airways",
                "GO": "Kuzu Airlines Cargo",
                "N5": "Skagway Air Service",
                "R8": "Kyrgyzstan Airlines",
                "YQ": "TAR Aerolineas",
                "LR": "LACSA",
                "KG": "LAI - Línea Aérea IAACA",
                "LA": "LATAM Chile",
                "4M": "LATAM Argentina",
                "PZ": "TAM Mercosur",
                "LU": "LATAM Express",
                "LP": "LATAM Peru",
                "NI": "Portugalia",
                "L5": "Lufttransport",
                "LO": "LOT Polish Airlines",
                "LT": "LongJiang Airlines",
                "N6": "Nuevo Continente",
                "QV": "Lao Airlines",
                "L7": "Línea Aérea SAPSA",
                "NG": "Lauda Air",
                "LQ": "Lebanese Air Transport",
                "LI": "Leeward Islands Air Transport",
                "LN": "Libyan Arab Airlines",
                "TM": "Linhas Aéreas de Moçambique",
                "JT": "Lion Mentari Airlines",
                "LM": "Livingston",
                "LB": "Lloyd Aéreo Boliviano",
                "LC": "Varig Logística",
                "HE": "Luftfahrtgesellschaft Walter",
                "LH": "Lufthansa Cargo",
                "CL": "Lufthansa CityLine",
                "L1": "Lufthansa Systems",
                "DV": "Nantucket Airlines",
                "LG": "Luxair",
                "5V": "Lviv Airlines",
                "L2": "Lynden Air Cargo",
                "L4": "Lynx Aviation",
                "Z8": "Línea Aérea Amaszonas",
                "MJ": "Mihin Lanka",
                "Q2": "Maldivian (airline)",
                "OD": "Malindo Airways",
                "M7": "Tropical Airways",
                "MH": "Malaysia Airlines",
                "IN": "NAM Air",
                "OM": "MIAT Mongolian Airlines",
                "DM": "Maersk",
                "W5": "Mahan Air",
                "M2": "MHS Aviation GmbH",
                "TF": "Malmö Aviation",
                "MA": "Malév Hungarian Airlines",
                "RI": "Mandala Airlines",
                "JE": "Mango",
                "MP": "Martinair",
                "Q4": "Starlink Aviation",
                "8M": "Myanmar Airways International",
                "MY": "Midwest Airlines (Egypt)",
                "MW": "Mokulele Airlines",
                "7M": "Mayair",
                "M8": "Mekong Airlines",
                "IM": "Menajet",
                "IG": "Meridiana",
                "MZ": "Merpati Nusantara Airlines",
                "YV": "Mesa Airlines",
                "XJ": "Thai AirAsia X",
                "MX": "Mexicana de Aviación",
                "ME": "Middle East Airlines",
                "YX": "Midwest Airlines",
                "M4": "Mistral Air",
                "2M": "Moldavian Airlines",
                "8I": "Myway Airlines",
                "YM": "Montenegro Airlines",
                "5M": "Sibaviatrans",
                "3R": "Moskovia Airlines",
                "M9": "Motor Sich",
                "N4": "Nordwind Airlines",
                "VZ": "Thai Vietjet Air",
                "UB": "Myanma Airways",
                "6N": "Nordic Regional",
                "P9": "Peruvian Airlines",
                "UE": "Transeuropean Airlines",
                "N7": "National Airlines",
                "NA": "North American Airlines",
                "9O": "National Airways Cameroon",
                "NC": "Northern Air Cargo",
                "CE": "Nationwide Airlines",
                "1N": "Navitaire",
                "RA": "Nepal Airlines",
                "EJ": "New England Airlines",
                "2N": "Yuzhmashavia",
                "HG": "Niki",
                "KZ": "Nippon Cargo Airlines",
                "DD": "Nok Air",
                "5N": "Nordavia",
                "JH": "Nordeste Linhas Aéreas Regionais",
                "N9": "North Coast Aviation",
                "NW": "Northwest Airlines",
                "J3": "Northwestern Air",
                "DY": "Norwegian Air Shuttle",
                "D8": "Norwegian Air International",
                "DU": "Norwegian Long Haul",
                "BJ": "Nouvel Air Tunisie",
                "O9": "Nova Airline",
                "VQ": "Novo Air",
                "NK": "Spirit Airlines",
                "UQ": "O'Connor Airlines",
                "O8": "Oasis Hong Kong Airlines",
                "VC": "Voyageur Airways",
                "OA": "Olympic Airlines",
                "WY": "Oman Air",
                "8Q": "Princess Air",
                "R2": "Orenburg Airlines",
                "OX": "Orient Thai Airlines",
                "OL": "OLT Express Germany",
                "ON": "Our Airline",
                "O7": "Ozjet Airlines",
                "PV": "St Barth Commuter",
                "9Q": "PB Air",
                "PU": "PLUNA",
                "U4": "PMTair",
                "BL": "Pacific Airlines",
                "8P": "Pacific Coastal Airlines",
                "Q8": "Pacific East Asia Cargo Airlines",
                "LW": "Sun Air International",
                "PK": "Pakistan International Airlines",
                "PF": "Palestinian Airlines",
                "NR": "Pamir Airways",
                "PN": "Pan American Airways",
                "I7": "Paramount Airways",
                "P3": "Passaredo Transportes Aéreos",
                "KS": "Peninsula Airways",
                "Z2": "EZD",
                "PR": "Philippine Airlines",
                "9R": "Phuket Air",
                "PI": "Sun Air (Fiji)",
                "9E": "Pinnacle Airlines",
                "PO": "Polar Air Cargo",
                "PH": "Polynesian Airlines",
                "PD": "Porter Airlines",
                "BK": "Potomac Air",
                "PW": "Precision Air",
                "TO": "Transavia France",
                "FE": "Primaris Airlines",
                "8W": "Private Wings Flugcharter",
                "P6": "Privilege Style Líneas Aéreas",
                "P0": "Proflight Zambia",
                "FV": "Rossiya",
                "QR": "Qatar Airways",
                "R6": "RACSA",
                "1D": "Radixx Solutions International",
                "V4": "Vieques Air Link",
                "FN": "Regional Air Lines",
                "ZL": "Regional Express",
                "P7": "Russian Sky Airlines",
                "RW": "Republic Airlines",
                "RL": "Royal Phnom Penh Airways",
                "SL": "Thai Lion Mentari",
                "GZ": "Air Rarotonga",
                "RR": "Royal Air Force",
                "AT": "Royal Air Maroc",
                "R0": "Royal Airlines",
                "BI": "Royal Brunei Airlines",
                "RJ": "Royal Jordanian",
                "RK": "Royal Khmer Airlines",
                "WR": "WestJet Encore",
                "WB": "Rwandair Express",
                "7S": "Ryan Air Service",
                "RD": "Ryan International Airlines",
                "FR": "Ryanair",
                "YS": "Régional Compagnie Aérienne Européenne",
                "TR": "Tigerair Singapore",
                "6Y": "Smartlynx Airlines",
                "7E": "Sylt Air GmbH",
                "S4": "SATA International",
                "SA": "South African Airways",
                "W7": "Western Pacific Airlines",
                "NL": "Shaheen Air International",
                "SK": "SAS Braathens",
                "UG": "Tuninter",
                "S7": "S7 Airlines",
                "BB": "Seaborne Airlines",
                "K5": "SeaPort Airlines",
                "UL": "SriLankan Airlines",
                "SY": "Sun Country Airlines",
                "I6": "Sky Eyes",
                "7G": "Star Flyer",
                "FA": "Safair",
                "HZ": "Sat Airlines",
                "SP": "SATA Air Acores",
                "8S": "Scorpio Aviation",
                "ZY": "Sky Airlines",
                "SQ": "Singapore Airlines Cargo",
                "SI": "Skynet Airlines",
                "XS": "SITA",
                "FT": "Siem Reap Airways",
                "SX": "Skybus Airlines",
                "S6": "Star Air",
                "D2": "Severstal Air Company",
                "5G": "Skyservice Airlines",
                "SD": "Sudan Airways",
                "SV": "Saudia",
                "WN": "Southwest Airlines",
                "A4": "Southern Winds Airlines",
                "WG": "Sunwing Airlines",
                "LX": "Swiss International Air Lines",
                "SR": "Swissair",
                "WV": "Swe Fly",
                "XQ": "SunExpress",
                "AL": "TransAVIAexport Airlines",
                "E5": "Samara Airlines",
                "SC": "Shandong Airlines",
                "9C": "Spring Airlines",
                "3U": "Sichuan Airlines",
                "FM": "Shanghai Airlines",
                "ZH": "Shenzhen Airlines",
                "7L": "Sun D'Or",
                "NE": "SkyEurope",
                "SO": "Sunshine Airlines",
                "JK": "Spanair",
                "1Z": "Sabre Pacific",
                "1S": "Sabre",
                "1H": "Siren-Travel",
                "1Q": "Sirena",
                "1K": "Sutra",
                "2C": "SNCF",
                "S0": "Slok Air Gambia",
                "S3": "Santa Barbara Airlines",
                "H2": "Sky Airline",
                "OO": "SkyWest Airlines",
                "BC": "Skymark Airlines",
                "LJ": "Sierra National Airlines",
                "MI": "SilkAir",
                "6Q": "Slovak Airlines",
                "PY": "Surinam Airways",
                "NB": "Sterling Airlines",
                "IE": "Solomon Airlines",
                "6W": "Saratov Airlines Joint Stock Company",
                "S5": "Trast Aero",
                "R1": "Sirin",
                "O3": "SF Airlines",
                "EQ": "TAME",
                "TP": "TAP Portugal",
                "TU": "Tunisair",
                "3V": "TNT Airways",
                "T2": "Thai Air Cargo",
                "TQ": "Tandem Aero",
                "ZT": "Titan Airways",
                "DG": "Tigerair Philippines",
                "TG": "Thai Airways International",
                "TK": "Turkish Airlines",
                "T7": "Twin Jet",
                "3P": "Tiara Air",
                "TI": "Tol-Air Services",
                "BY": "Thomson Airways",
                "PM": "Tropic Air",
                "QT": "TAMPA",
                "K3": "Taquan Air Services",
                "GE": "TransAsia Airways",
                "HV": "Transavia Holland",
                "VR": "TACV",
                "T9": "Thai Star Airlines",
                "9T": "Transwest Air",
                "UN": "Transaero Airlines",
                "T5": "Turkmenhovayollary",
                "T6": "Tavrey Airlines",
                "TW": "T'way Air",
                "6B": "TUIfly Nordic",
                "DT": "TAAG Angola Airlines",
                "SF": "Tassili Airlines",
                "TJ": "Tradewind Aviation",
                "1E": "Travelsky Technology",
                "2H": "Thalys",
                "1L": "Open Skies Consultative Commission",
                "RO": "Tarom",
                "3T": "Turan Air",
                "T4": "TRIP Linhas Aéreas",
                "L6": "Tbilaviamsheni",
                "XN": "XpressAir",
                "VO": "Tyrolean Airways",
                "U5": "USA3000 Airlines",
                "UA": "United Airlines",
                "4H": "United Airways",
                "U6": "Ural Airlines",
                "UF": "UM Airlines",
                "6Z": "Ukrainian Cargo Airways",
                "5X": "United Parcel Service",
                "US": "US Airways",
                "UH": "US Helicopter",
                "UT": "UTair Aviation",
                "HY": "Uzbekistan Airways",
                "PS": "Ukraine International Airlines",
                "VA": "Viasa",
                "VF": "Valuair",
                "0V": "Vietnam Air Services Company (VASCO)",
                "VN": "Vietnam Airlines",
                "NN": "VIM Airlines",
                "2R": "Via Rail Canada",
                "Y4": "Volaris",
                "VI": "Volga-Dnepr Airlines",
                "TV": "Virgin Express",
                "VS": "Virgin Atlantic Airways",
                "ZG": "Viva Macau",
                "XF": "Vladivostok Air",
                "VM": "Viaggio Air",
                "9V": "Vipair Airlines",
                "RG": "VRG Linhas Aéreas",
                "VP": "VASP",
                "VG": "VLM Airlines",
                "WT": "Wasaya Airways",
                "2W": "Welcome Air",
                "WZ": "West African Airlines",
                "YH": "West Caribbean Airways",
                "8O": "West Coast Air",
                "WS": "WestJet",
                "XP": "Xtra Airways",
                "WF": "Widerøe",
                "IV": "Wind Jet",
                "7W": "Windrose Air",
                "8Z": "Wizz Air Bulgaria",
                "W6": "Wizz Air",
                "WO": "World Airways",
                "1P": "Worldspan",
                "MF": "Xiamen Airlines",
                "SE": "XL Airways France",
                "YL": "Yamal Airlines",
                "Y8": "Yangtze River Express",
                "Y0": "Yellow Air Taxi/Friendship Airways",
                "IY": "Yemenia",
                "C4": "Zimex Aviation",
                "Q3": "Zambian Airways",
                "Z4": "Zoom Airlines"
        };
        airlinelocal_departure = item.local_departure;
         var tweentyfromTime= airlinelocal_departure.slice(11,19);
         var departure_dateform=new Date(airlinelocal_departure);
         var mishra=departure_dateform.toLocaleTimeString()
       //console.log(mishra);
        var ankitTime=mishra.slice(0,11);
       console.log(ankitTime);
         var depart_string=departure_dateform.toDateString();
         var departTime=depart_string.slice(0,10)
         
        localArrival=item.local_arrival;
          var tweentylocalArrival= localArrival.slice(11,19);
          var arrival_dateform=new Date(localArrival);
    // console.log(abhi);
     var abhi=arrival_dateform.toLocaleTimeString()
     var apnaTime=abhi.slice(0,11);
        console.log(apnaTime);
         var arrival_string=arrival_dateform.toDateString();
         var arrivalTime=arrival_string.slice(0,10);
         // // var  timetaken=(abhi-mishra);
         // console.log(timetaken);
         // alert(( new Date("1970-1-1"+ abhi) - new Date("1970-1-1 "+mishra))/1000/60);  
         // console.log(diff);
         var startTime=moment(tweentyfromTime, "HH:mm:ss a");
         var endTime=moment(tweentylocalArrival, "HH:mm:ss a");
         var duration = moment.duration(endTime.diff(startTime));
         var hours = parseInt(duration.asHours());
         // console.log(hours);
         var minutes = parseInt(duration.asMinutes())-hours*60;
         // console.log(minutes);
         var result=(hours + 'hr and '+ minutes+'min');
            
       // var result = endTime.diff(startTime, 'hours') + " Hrs and " + endTime.diff(startTime, 'minutes') + " Mns";
        
          cityFrom=item.route[0].flyFrom;
          cityTo=item.route[0].flyTo;
          airline=item.route[0].airline;
          cityname_from=item.route[0].cityFrom;
          cityname_to=item.route[0].cityTo;
          flightno=item.route[0].flight_no;
          // timetaken=(airlinelocal_departure-localArrival);
    
          price=item.price; 
            // find keys
      // keyObj1 = Object.keys(airline);
      keyObj2 = Object.keys(dataAir);
        
      // find values
      // valueObj1 = Object.values(airline);
      valueObj2 = Object.values(dataAir);
      
          for (var k in keyObj2){
              
  
          var airlin=keyObj2[k];
          if(airline==airlin){
                  // console.log(valueObj2[k]);
                  $('#main-search-option').prepend(                  
                            //'<ul class="dateDisplay">'+
                            //'<li class="col-md-12 li" >'+ 'Departure :'+ (departTime)+'Price: ₹ '+(price)+ 'Arrivals :'+(arrivalTime)+'cityFrom :'+(cityFrom)+ (cityname_from)+  'cityto: '+(cityTo)+(cityname_to)+'हवाई जहाज :'+(valueObj2[k].Airline_Name)+'Logo :'+("<img width='75' height='50' src="+valueObj2[k].logo+">")+'-'+'flightno:'+(flightno)+'</li>'+   
                            //'</ul>'+
  
                              
                            '<div class="search-option">'+
                              '<div class="summary-section">'+
                                  '<div class="flight-info">'+
                                      '<div class="airline-info">'+
                                          '<div class="logo">'+
                                              '<img src='+(valueObj2[k].logo)+' alt="">'+
                                          '</div>'+
                                          '<div class="text">'+
                                              '<a class="flight-name">'+(valueObj2[k].Airline_Name)+'</a>'+
                                              '<div class="flight-number">'+(flightno)+'</div>'+
                                          '</div>'+
                                      '</div>'+
                                      '<div class="flight-summary">'+
                                          '<div class="left-wing">'+
                                              '<div class="city">'+(cityname_from)+' <span class="city-code">('+(cityFrom)+')</span> </div>'+
                                              '<div class="time">'+(ankitTime)+'</div>'+
                                          '</div>'+
                                          '<div class="timeline-widget">'+
                                              '<div class="c-timeline-wrapper horizontal">'+
                                                  '<div class="label tl first"></div>'+
                                                  '<div class="label tl ">'+(result)+'</div>'+
                                                  '<div class="label tl last"></div>'+
                                                  '<div class="c-timeline">'+
                                                      '<div class="dot"></div>'+
                                                      '<div class="dot"></div>'+
                                                      '<div class="dot"></div>'+
                                                  '</div>'+
                                                  '<div class="label br first"></div>'+
                                                  '<div class="label br ">1 stop</div>'+
                                                  '<div class="label br last"></div>'+
                                              '</div>'+
                                          '</div>'+
                                          '<div class="right-wing">'+
                                              '<div class="city">'+(cityname_to)+' <span class="city-code">('+(cityTo)+')</span> </div>'+
                                              '<div class="time">'+(apnaTime)+'</div>'+
                                          '</div>'+
                                          '<div class="u-clear"></div>'+
                                      '</div>'+
                                      '<div class="detail-links null">'+
                                          '<label class="u-rfloat link" id="check"  onClick="idSelect(\'' +i + '\')" for="fd_'+(i)+'">Flight Detail <i class="ti-angle-down"></i></label>'+
                                          '<input type="checkbox" name="" class="detail-check" id="fd_'+(i)+'" value="fd_'+(i)+'">'+
                                          '<div class="u-clear"></div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="provider-list">'+
                                      '<div class="fare-provider-list u-fb single-item">'+
                                          '<div class="list-item selected-fare">'+
                                              '<div class="price-section">'+
                                                  '<div class="price">'+
                                                      '<div class="c-price-display u-text-ellipsis " title="">'+
                                                          '<img src="images/serviceprovider/kiwi.jpg" class="serviceprovider" alt="">'+
                                                          '<img src="images/rupee.svg" class="rupee" alt="">'+
                                                          '<span class="">'+(price)+'</span>'+
                                                      '</div>'+
                                                  '</div>'+
                                              '</div>'+
                                              '<div class="features u-ib"> </div>'+
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="preferred-provider">'+
                                      '<div class="preferred-provider-container">'+
                                          '<button class="btn btn-apply enabled">Book</button>'+
                                      '</div>'+
                                  '</div>'+
                              '</div>'+
                              '<div class="detail-section fd_'+(i)+'">'+
                                  '<div class="nav-wrapper">'+
                                      '<span>'+
                                          '<div class="nav-list-item u-uppercase u-ib  selected" data="0">Flight Details</div>'+
                                      '</span>'+
                                  '</div>'+
                                  '<div class="flight-segment-detail">'+
                                      '<div class="accordion-item">'+
                                          '<div class="accordion-hdr ">'+
                                              '<div class="accordion-hdr-cntnt">'+
                                                  '<div class="leg-summary">'+
                                                      '<div class="u-lfloat">New Delhi to Mumbai</div>'+
                                                      '<div class="u-rfloat">'+
                                                          '<div class="date">Sun, 24 Nov</div>'+
                                                          '<i class="fas fa-circle"></i>'+
                                                          '<div class="time">1hr 15min</div>'+
                                                      '</div>'+
                                                      '<div class="u-clear"></div>'+
                                                  '</div>'+
                                             '</div>'+
                                          '</div>'+
                                          '<div class="accordion-body">'+
                                              '<div class="segment">'+
                                                  '<div class="airline">'+
                                                      '<div class="logo">'+
                                                          '<img src='+(valueObj2[k].logo)+'>'+
                                                      '</div>'+
                                                      '<div class="info">'+(valueObj2[k].Airline_Name)+' '+(flightno)+'</div>'+
                                                      '<div class="aircraft-info">A320-200</div>'+
                                                      '<div class="cabin-class">economy</div>'+
                                                      '<div class="aircraft-info">Narrow 3-3 (Limited seat tilt)</div>'+
                                                      '<div class="aircraft-info">Narrow</div>'+
                                                  '</div>'+
                                                  '<div class="segment2">'+
                                                      '<div class="flight-info">'+
                                                          '<div class="summary">'+
                                                              '<div class="left-wing">'+
                                                                  '<div class="highlight">'+
                                                                      '<div class="city">'+(cityname_from)+'</div>'+
                                                                      '<div class="airport-code">('+(cityFrom)+')</div>'+
                                                                  '</div>'+
                                                                  '<div class="time"> '+(ankitTime)+'</div>'+
                                                                  '<div class="date">'+(departTime)+'</div>'+
                                                                  '<div class="airport u-text-ellipsis" title="Amausi Airport">Amausi Airport</div>'+
                                                              '</div>'+
                                                              '<div class="middle">'+
                                                                  '<div class="icon ti-time"></div>'+
                                                                  '<div class="duration">'+(result)+'</div>'+
                                                              '</div>'+
                                                              '<div class="right-wing">'+
                                                                  '<div class="highlight">'+
                                                                      '<div class="city">'+(cityname_to)+'</div>'+
                                                                      '<div class="airport-code">('+(cityTo)+')</div>'+
                                                                  '</div>'+
                                                                  '<div class="time">'+(apnaTime)+'</div>'+
                                                                  '<div class="date">'+(arrivalTime)+'</div>'+
                                                                  '<div class="airport u-text-ellipsis">Indira Gandhi Intl Airport</div>'+
                                                              '</div>'+
                                                          '</div>'+
                                                          '<div class="u-clear"></div>'+
                                                      '</div>'+
                                                      '<div class="baggage">'+
                                                          '<div class="row no-gutters">'+
                                                              '<div class="col-6 text-center border">'+
                                                                  '<div class="heading">Cabin Baggage</div>'+
                                                                  '<span class="weight">15 Kg</span>'+
                                                              '</div>'+
                                                              '<div class="col-6 text-center">'+
                                                                  '<div class="heading">Check-in Baggage</div>'+
                                                                  '<span class="weight">7 Kg</span>'+
                                                              '</div>'+
                                                          '</div>'+
                                                      '</div>'+
                                                      '<div class="amenities">'+
                                                          '<div class="row">'+
                                                              '<div class="col-6 text-center">'+
                                                                  '<i class="fas fa-wifi wifi available"></i>'+
                                                              '</div>'+
                                                              '<div class="col-6 text-center">'+
                                                                  '<i class="fas fa-plug plug"></i>'+
                                                              '</div>'+
                                                          '</div>'+
                                                          '<div class="row align-self-center top-margin-20">'+
                                                              '<div class="col-6 text-center">'+
                                                                  '<i class="fas fa-utensils food"></i>'+
                                                              '</div>'+
                                                              '<div class="col-6 text-center">'+
                                                                  '<i class="fab fa-youtube video"></i>'+
                                                              '</div>'+
                                                          '</div>'+
                                                      '</div>'+
                                                      '<div class="u-clear"></div>'+
                                                  '</div>'+
                                              '</div>'+
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                              '</div>'
                              
                  );
          }
    
    
          }
         
      });
      count = count + 1;
      
    }
  
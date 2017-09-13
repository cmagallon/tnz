$(document).ready(function() {

    var validation;

    var locations = [{
        lat: -36.840087,
        lng: 174.765616,
        title: "Auckland Hotel",
        image: 'img/hotel1.png',
        alt: 'Auckland Hotel'
    }, {
        lat: -36.850052,
        lng: 174.775968,
        title: "Auckland Hostel",
        image: 'img/hostel1.png',
        alt: 'Auckland Hostel'
    }, {
        lat: -36.858107,
        lng: 174.760711,
        title: "Auckland Motel",
        image: 'img/motel1.png',
        alt: 'Auckland Motel'
    }, {
        lat: -36.846455,
        lng: 174.746593,
        title: "Auckland House",
        image: 'img/house1.png',
        alt: 'Auckland House'
    }, {
        lat: -38.148606,
        lng: 176.254691,
        title: "Rotorua Hotel",
        image: 'img/hotel1.png',
        alt: 'Rotorua Hotel'
    }, {
        lat: -38.136167,
        lng: 176.247921,
        title: "Rotorua Hostel",
        image: 'img/hostel1.png',
        alt: 'Rotorua Hostel'
    }, {
        lat: -38.129170,
        lng: 176.241449,
        title: "Rotorua Motel",
        image: 'img/motel1.png',
        alt: 'Rotorua Motel'
    }, {
        lat: -38.130882,
        lng: 176.239522,
        title: "Rotorua House",
        image: 'img/house1.png',
        alt: 'Rotorua House'
    }, {
        lat: -38.703609,
        lng: 176.101222,
        title: "Taupo Hotel",
        image: 'img/hotel1.png',
        alt: 'Taupo Hotel'
    }, {
        lat: -38.689396,
        lng: 176.078496,
        title: "Taupo Hostel",
        image: 'img/hostel1.png',
        alt: 'Taupo Hostel'
    }, {
        lat: -38.690049,
        lng: 176.080306,
        title: "Taupo Motel",
        image: 'img/motel1.png',
        alt: 'Taupo Motel'
    }, {
        lat: -38.692856,
        lng: 176.088234,
        title: "Taupo House",
        image: 'img/house1.png',
        alt: 'Taupo House'
    }, {
        lat: -41.290987,
        lng: 174.778961,
        title: "Wellington Hotel",
        image: 'img/hotel1.png',
        alt: "Wellington Hotel"
    }, {
        lat: -41.293081,
        lng: 174.783985,
        title: "Wellington Hostel",
        image: 'img/hostel1.png',
        alt: "Wellington Hostel"
    }, {
        lat: -41.295130,
        lng: 174.783733,
        title: "Wellington Motel",
        image: 'img/motel1.png',
        alt: "Wellington Motel"
    }, {
        lat: -41.297062,
        lng: 174.784927,
        title: "Wellington House",
        image: 'img/house1.png',
        alt: "Wellington House"
    }];

    var self;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    validation = {

        init: function() {
            self = this;
            self.addEvents();

            self.firstDate = null;
            self.secondDate = null;
            self.totalNights = null;

            self.storage = {

                'userDetails': false,

                stops: [

                ]
            };

            self.markers = [

            ];

            self.validation = {
                'email': false,
                'firstName': false,
                'lastName': false
            };


            self.initMap();


            $("#calendar1").datepicker({
                onSelect: function() {
                    self.firstDate = $(this).datepicker('getDate');
                }
            });

            $("#calendar2").datepicker({
                onSelect: function() {
                    self.secondDate = $(this).datepicker('getDate');
                    self.nightsDiff(self.firstDate, self.secondDate);
                }
            });

            self.startSwipe();


        },

        startSwipe: function() {
            var mySwiper = new Swiper('.swiper-container', {
                speed: 400,
                spaceBetween: 100,
                pagination: '.swiper-pagination',
                paginationClickable: true
            });

        },

        initMap: function() {
            directionsDisplay = new google.maps.DirectionsRenderer();
            var newZealand = new google.maps.LatLng(-38.977694, 175.792236);
            var mapOptions = {
                zoom: 4,
                center: newZealand
            };
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            directionsDisplay.setMap(map);
        },


        calcRoute: function(first, second) {


            var start = new google.maps.LatLng(first.lat, first.lng);
            var end = new google.maps.LatLng(second.lat, second.lng);

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setMap(map);
                }
            });

        },



        nightsDiff: function(first, second) {

            var dayDiff = Math.ceil((first - second) / (1000 * 60 * 60 * 24));

            self.totalNights = -dayDiff;


        },

        addEvents: function() {
            $('#add-stop').on('click', self.checkSelect.bind(this));
            $('#add-trip').on('click', self.openModal.bind(this));
            $('#modal-done').on('click', self.getTrip.bind(this));
            $('.travelers_selector').on('change', function(e) {
                var v = $(this).val();
                var one = $('#accomodationone');
                var two = $('#accomodationtwo');
                var three = $('#accomodationthree');
                var four = $('#accomodationfour');
                var five = $('#accomodationfive');
                var six = $('#accomodationsix');
                var hideAll = $('.number').hide();

                hideAll.hide();
                $('.number').removeClass('selected');

                if (v === '0') {
                    one.addClass('selected').show();
                }

                if (v === '1') {
                    two.addClass('selected').show();
                }

                if (v === '2') {
                    three.addClass('selected').show();
                }

                if (v === '3') {
                    four.addClass('selected').show();
                }

                if (v === '4') {
                    five.addClass('selected').show();
                }

                if (v === '5') {
                    six.addClass('selected').show();
                }

            });

        },

        getTrip: function() {

            self.nightsDiff(self.firstDate, self.secondDate);

            $('.error-modal').html('');


            var modal = $('.modal-trip');
            var trip;
            var firstName, lastName, email, price;

            if (self.storage.userDetails === true) {

                firstName = $('#first-name').val();
                lastName = $('#last-name').val();
                email = $('#email').val();

            }

            price = $('.selected select').val();
            var place = $('.selected select option:selected').attr('place');
            var guests = $('.travelers_selector').val();
            var city = $('#cities').val();


            trip = {
                'user': {
                    'firstName': firstName,
                    'lastName': lastName,
                    'email': email
                },
                'guests': parseInt(guests) + 1,
                'where': city,
                'price': price,
                'place': place,
                'days': self.totalNights,
                'totalPrice': price * self.totalNights
            };


            if (self.totalNights === 0) {
                var span = $('<li>Fill all values</li>');
                $('.error-modal').append(span);
            }

            if (self.totalNights > 15) {
                var span = $('<li>15 days max</li>');
                $('.error-modal').append(span);
            }

            if (self.totalNights <= 0) {
                var span = $('<li>Check out date invalid</li>');
                $('.error-modal').append(span);

            }

            if ((self.totalNights > 0) && (self.totalNights <= 15)) {
                self.storage.stops.push(trip);
                $('.modal-trip').removeClass('active');
                $('.swiper-container').removeClass('active');
                self.createBooking(trip);


            }

        },

        createBooking: function(trip) {
            var container = $('.booking');

            var user = (trip.user);

            var containerBooking = $('<div class="booking-item"></div>');

            var Name = $('<h3><span>Name:</span> ' + user.firstName + ' ' + user.lastName + '</h3>');
            var Email = $('<h3><span>Email:</span> ' + user.email + '</h3>');
            var City = $('<h3><span>City:</span> ' + trip.where + '</h3>');
            var Place = $('<h3><span>Accomodation:</span> ' + trip.place + '</h3>');
            var Nights = $('<h3><span>Nights:</span> ' + trip.days + '</h3>');

            var Total = $('<h3><span>Nights for ' + trip.guests + ' guests: </span> $' + trip.totalPrice + '</h3>');


            self.myBooking = trip.where + ' ' + trip.place;


            for (var i = 0; i < locations.length; i++) {
                var location = locations[i];



                if (location.title === self.myBooking) {
                    self.markers.push(location);


                }
            }

            if (self.markers.length === 2) {
                self.calcRoute(self.markers[0], self.markers[1]);

                $('#map').addClass('active');
            }

            containerBooking.append(Name);
            containerBooking.append(Email);
            containerBooking.append(City);
            containerBooking.append(Place);
            containerBooking.append(Nights);

            containerBooking.append(Total);

            container.append(containerBooking);


        },

        openModal: function(e) {



            $('.validation').html(' ');


            var email = $('#email');
            var firstName = $('#first-name');
            var lastName = $('#last-name');


            var checkEmail = self.validation.email === true;
            var checkfistName = self.validation.firstName === true;
            var checklastName = self.validation.lastName === true;

            if (checkEmail && checkfistName && checklastName) {
                $('.modal-trip').addClass('active');
                $('.swiper-container').addClass('active');
                self.storage.userDetails = true;
            } else {
                self.validateChar(firstName, 'firstName');
                self.validateChar(lastName, 'lastName');
                self.validateEmail(email);

            }

            e.preventDefault();

        },



        validateEmail: function(emailField) {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(emailField.val()) === false) {

                var tag = $('<p class="error">Invalid Email Address</p>');
                $('.validation').append(tag);

            } else {
                self.validation.email = true;
            }

        },

        validateChar: function(charField, argument) {
            var reg = /^[A-Za-z\s]+$/;

            if (reg.test(charField.val()) === false) {
                if (argument === 'firstName') {
                    var tag = $('<p class="error">Invalid First Name</p>');
                    $('.validation').append(tag);
                }
                if (argument === 'lastName') {
                    var tag = $('<p class="error">Invalid Last Name</p>');
                    $('.validation').append(tag);
                }

            } else {
                if (argument === 'firstName') {
                    self.validation.firstName = true;
                }

                if (argument === 'lastName') {
                    self.validation.lastName = true;
                }
            }

        },


        checkSelect: function() {
            var tagContainer = $('.tags-container');
            var myValue = $("#cities").val();
            var myText = $("#cities");

            var tag = $('<div>' + myValue + '<span>X</span></div>');
            tag.addClass('tag');
            tag.attr('data-value', myValue);

            tagContainer.append(tag);

            self.storage.stops.push(myValue);

            tag.on('click', function() {
                $(this).remove();
            });




        }



    };

    validation.init();

});

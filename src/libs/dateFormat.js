import dateformat from 'dateformat';

export default (date, format='UTC:d mmmm yyyy, HH:MM') => dateformat(date, format).replace("August","Agustus").replace("May","Mei").replace("June","Juni").replace("July","Juli").replace("January","Januari").replace("February","Februari").replace("March","Maret").replace("October","Oktober").replace("December","Desember")
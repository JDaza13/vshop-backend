const Promise = require('promise');
const CategoryDao = require('../daos/categoryDao');

//Service methods

const filterCategories = function(params){

    return CategoryDao.fetchCategories(params);
}
/*
const insertHotels = function(hotelArray) {
  return hotelDao.createHotels(hotelArray);  
};

const editHotel = function(hotelData, hotelId) {
  return hotelDao.editHotel(hotelData, hotelId);  
};

const removeHotel = function(hotelId) {
  return hotelDao.deleteHotel(hotelId);  
};
*/
//Service exports

exports.getCategories = function (params) {
    
    return filterCategories(params);
};
/*
exports.putHotels = function (hotels) {
    return insertHotels(hotels);
};

exports.updateHotel = function (hotelData, hotelId) {
    return editHotel(hotelData, hotelId);
};

exports.deleteHotel = function (hotelId) {
    return removeHotel(hotelId);
};
*/
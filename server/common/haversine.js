const haversine = {};

/**
 * @argument lon1 Longitud del punto inicial
 * @argument lat1 Latitud del punto inicial
 * @argument lon2 Latitud del punto final
 * @argument lat2 Latitud del punto final
 */
haversine.formula = (lon1, lon2, lat1, lat2) => {
    var R = 6371; // km  
    var dLat = (lat2-lat1)*Math.PI/180;  
    var dLon = (lon2-lon1)*Math.PI/180;   
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +  
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *   
            Math.sin(dLon/2) * Math.sin(dLon/2);   
    var c = 2 * Math.asin(Math.sqrt(a));   
    return Number((R * c).toFixed(2));
}

module.exports = haversine;
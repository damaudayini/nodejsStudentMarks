const constants = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode;

    switch(statusCode){
        case constants.HTTP_STATUS_400 :
            res.json({
                title: "Bad Request",
                message: err.message
              });
            break;
        // case constants.HTTP_STATUS_401 :
        //         res.json({
        //             title: "Unauthorized",
        //             message: err.message
        //           });
        //         break;
        // case constants.HTTP_STATUS_403 :
        //             res.json({
        //                 title: "Forbidden",
        //                 message: err.message
        //               });
        //         break;
        case constants.HTTP_STATUS_404 :
                    res.json({
                        title: "Not found",
                        message: err.message
                      });
                break;
        // case constants.HTTP_STATUS_500 :
        //         res.json({
        //             title: "Technical Error",
        //             message: "Technical Error. Please contact system Admin"
        //           });
        //         break;
        
        default:
          res.json({
                        title: "Error",
                        message: err.message
                      });
            break;
    }
}

module.exports = errorHandler;
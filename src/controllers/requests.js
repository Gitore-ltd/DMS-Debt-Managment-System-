import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { User, Request, Product } from '../database/models';

class requests {
  static async requestLoan(req, res) {
    const user = await User.findOne({ where: { email: req.user.email } });

    const {
      title, quality, quantity, tobePayed,
    } = req.body;

    const product = await Product.findOne({ where: { title: req.body.title } });

    if (product === null) {
      return res.status(404).json({
        status: 404,
        messsage: 'product not found',
      });
    }

    const reqInfo = {
      requestId: uuidv4(),
      email: user.dataValues.email,
      requester: `${user.dataValues.firstName} ${user.dataValues.lastName}`,
      nationalId: user.dataValues.nationalId,
      phoneNumber: user.dataValues.telephone,
      requestedProductId: product.dataValues.productId,
      productTitle: title,
      price: product.dataValues.price,
      quality,
      quantity,
      total: quantity * product.dataValues.price,
      requestedDate: moment().format('YYYY-MM-DD').toString(),
      tobePayed,
      requestStatus: 'pending',
    };

    const checkDuplication = await Request.findAll({
      where: {
        productTitle: title,
        email: req.user.email,
        quantity: reqInfo.quantity,
      },
    });

    if (checkDuplication.length > 0) {
      return res.status(409).json({
        status: 409,
        messsage: 'Request was made earlier!',
      });
    }
    await Request.create(reqInfo)
      .then(() => Request.findOne({ where: { productTitle: title } }))
      .then(() => res.status(200).json({
        status: 200,
        messsage: 'request successfuly submited!',
        reqInfo,
      }));
  }

  static async myRequests(req, res) {
    try {
      const allRequest = await Request.findAll({
        where: { email: req.user.email },
      });
      if (allRequest.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No product found',
        });
      }
      return res.status(200).json({
        status: 200,
        allRequest,
      });
    } catch (error) {
      return res.json({
        Error: error.message,
      });
    }
  }

  static async findRequest(req, res) {
    try {
      const requestInfo = await Request.findOne({
        where: { requestId: req.body.requestId },
      });
      const request = requestInfo ? requestInfo.dataValues : '';

      if (request.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No request found',
        });
      }
      return res.status(200).json({
        status: 200,
        request,
      });
    } catch (error) {
      return res.json({
        Error: error.message,
      });
    }
  }
}

export default requests;

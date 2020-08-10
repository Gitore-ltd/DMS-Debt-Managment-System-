import { Request } from '../database/models';

class managerController {
  static async viewAllRequests(req, res) {
    try {
      const allRequest = await Request.findAll();
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

  static async ApproveRequest(req, res) {
    try {
      const request = await Request.findOne({ where: { requestId: req.headers.requestid } });
      if (request.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Request not found',
        });
      }

      if (request.requestStatus === 'approved') {
        res.json({ message: 'request already approved!' });
      }

      Request.update(
        ({ requestStatus: 'approved' }), { where: { requestId: req.headers.requestid } },
      )

        .then(() => Request.findOne({ where: { requestId: req.headers.requestid } }))
        .then((request) => {
          res.json({ message: 'request approved successfully', request });
        });
    } catch (error) {
      return res.json({
        Error: error.message,
      });
    }
  }

  static async RejectRequest(req, res) {
    try {
      const request = await Request.findOne({ where: { requestId: req.headers.requestid } });
      if (request.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'Request not found',
        });
      }

      if (request.requestStatus === 'rejected') {
        res.json({ message: 'request already rejected!' });
      }

      Request.update(
        ({ requestStatus: 'rejected' }), { where: { requestId: req.headers.requestid } },
      )

        .then(() => Request.findOne({ where: { requestId: req.headers.requestid } }))
        .then((request) => {
          res.json({ message: 'request rejected successfully', request });
        });
    } catch (error) {
      return res.json({
        Error: error.message,
      });
    }
  }
}

export default managerController;

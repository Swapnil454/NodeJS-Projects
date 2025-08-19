const shortid = require("shortid")
const URL = require("../models/url")

async function handlePostUrl(req, res) {
    const body = req.body || {}
    if(!body.url) return res.status(400).json({err:"url is missing"})
    const shortID = shortid()

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    return res.render('home',{id: shortID})
   //  const allUrls = await URL.find({});
   //  return res.render('home', {
   //      id: shortID,
   //      urls: allUrls
   //  });
}

async function handleAllUser(req, res) {
   // Only return URLs belonging to the current user
   const urls = await URL.find({ createdBy: req.user._id });
   return res.json(urls);
}

async function HandleUrlAnalytics(req, res) {
   try {
      const shortId = req.params.shortId;
      const result = await URL.findOne({
          shortId,
          createdBy: req.user._id
      });
      
      if (!result) {
          return res.status(404).json({
              err: "URL not found or you do not have permission to view analytics"
          });
      }
      
      return res.json({
          totalClicks: result.visitHistory.length,
          analytics: result.visitHistory
      });
   } catch (error) {
      return res.status(400).json({err: "Error retrieving analytics"});
   }
}

async function handleVisitUrl(req, res) {
   const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate({
      shortId,
   },{
      $push:{
         visitHistory: {
            timestamp: new Date().toLocaleString()
         }
      }
   });
   res.redirect(entry.redirectURL)
}

async function handleUpdateUrl(req, res) {
    try {
        const shortId = req.params.shortId;
        const { newUrl } = req.body;
        
        if (!newUrl) return res.status(400).json({ err: "new URL is required" });
        
        const entry = await URL.findOneAndUpdate(
            { shortId, createdBy: req.user._id },
            { redirectURL: newUrl },
            { new: true }
        );
        
        if (!entry) {
            return res.render('home', { 
                urls: await URL.find({ createdBy: req.user._id }), 
                error: 'URL not found or you do not have permission to update it' 
            });
        }
        
        return res.render('home', { 
            urls: await URL.find({ createdBy: req.user._id }), 
            message: 'URL updated successfully' 
        });
    } catch (error) {
        return res.status(400).json({ err: "Error updating URL" });
    }
}

async function handleDeleteUrl(req, res) {
    try {
        const shortId = req.params.shortId;
        // Only allow deletion if the URL belongs to the current user
        const url = await URL.findOneAndDelete({ 
            shortId,
            createdBy: req.user._id 
        });
        
        if (!url) {
            return res.render('home', { 
                urls: await URL.find({ createdBy: req.user._id }), 
                error: 'URL not found or you do not have permission to delete it' 
            });
        }
        
        return res.render('home', { 
            urls: await URL.find({ createdBy: req.user._id }), 
            message: 'URL deleted successfully' 
        });
    } catch (error) {
        return res.status(400).json({ err: "Error deleting URL" });
    }
}

module.exports = {
    handlePostUrl,
    handleAllUser,
    HandleUrlAnalytics,
    handleVisitUrl,
    handleUpdateUrl,
    handleDeleteUrl
}
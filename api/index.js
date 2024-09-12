const express = require('express');
const cors = require('cors');
require('dotenv').config();
const  mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { log } = require('console');


const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdkjffsjdfsdjsdjccjcn';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
// app.use(cors({
//     // credentials : true,
//     // // origin : 'http://localhost:5173'
//     // origin : 'https://a-xes-stays.vercel.app/'
// }));

const corsOptions = {
    origin: 'https://a-xes-stays.vercel.app', // Whitelist your frontend domain
    credentials: true // Allow cookies and other credentials
  };
  
  app.use(cors(corsOptions));
  


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to MongoDB');
})


///////////

function getUserDataFromReq(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            resolve(userData);
        });
    });
}


//// GETS POSTS 

app.get('/test', (req,res) => {
    res.json('test OK!');
})

const ADMIN_KEY = "siteadmin"
app.post('/register', async (req,res) => {
    const { name, email, password, adminKey } = req.body;

    try {
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            return res.status(422).json({ error: 'User already exists' });
        }
        const isAdmin = adminKey === ADMIN_KEY;
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            isAdmin
        });

        res.status(201).json(userDoc);
    } catch (error) {
        res.status(422).json({ error: 'Registration failed', details: error.message }); // Provide more details
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);

            if (passOk) {
                const token = jwt.sign(
                    { email: userDoc.email, id: userDoc._id },
                    jwtSecret,
                    { expiresIn: '1h' } 
                );
                
                // res.cookie('token', token, { httpOnly: true }); 
                res.cookie('token', token, {
                    httpOnly: true,  // Prevent client-side access to the cookie
                    secure: false,   // Set to true in production when using HTTPS
                    sameSite: 'lax', // Helps with CSRF protection
                    maxAge: 3600000, // Cookie expiration (1 hour)
                  });
                  
                res.json(userDoc);
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during login' });
    }
});


app.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                return res.status(500).json({ error: 'JWT verification failed' });
            }
            try {
                const {name, email, _id} = await User.findById(userData.id);
                res.json({name, email, _id});
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });  
            }
        });
    } else {
        res.json(null);
    }
});


app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})



app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;

    if (!link || link.trim() === '') {
        return res.status(400).json({ error: 'Invalid link' });
    }

    const newName = 'photo' + Date.now() + '.jpg';

    try {
        await imageDownloader.image({
            url: link,
            dest: __dirname + '/uploads/' + newName, 
        });

        res.json(newName);
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Failed to download image' });
    }
});


const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = req.files.map((file) => {
        const { path, originalname } = file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        return newPath.substring('uploads/'.length);
    });

    res.json(uploadedFiles);
});

 
app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {title, address, description, addedPic, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            description,
            photos:addedPic,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        });
        res.json(placeDoc);
    });
})

app.get('/user-places', (req,res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json(await Place.find({owner : id}) );
    });
})

app.get('/places/:id', async  (req,res) => {
    const {id} = req.params;
    res.json(await Place.findById(id))
})
 
app.put('/places', async (req, res) => {
    const { id, title, address, description, addedPic, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    
    try {
        const placeDoc = await Place.findById(id);
        if (!placeDoc) {
            return res.status(404).json({ error: 'Place not found' });
        }

        placeDoc.set({
            title,
            address,
            description,
            photos: addedPic,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        });

        await placeDoc.save();
        res.json('ok');
    } catch (err) {
        console.error('Error updating place:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
 

app.delete('/deletehotels/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const placeDoc = await Place.findById(id);
        if (!placeDoc) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        await Place.deleteOne({ _id: id });  // Use deleteOne to delete the hotel by its ID
        res.json({ message: 'Hotel deleted successfully' });
    } catch (err) {
        console.error('Error deleting hotel:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/places', async (req, res) => { 
    const searchQuery = req.query.search || '';
    const places = await Place.find({ title: { $regex: searchQuery, $options: 'i' } }); 
    res.json(places);
});


app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req)

    const{place, checkIn, checkOut, maxGuests, name, phone, price,} = req.body;

    Booking.create({
        place, checkIn, checkOut, maxGuests, name, phone, price, user: userData.id
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
            throw err;
    })
});

app.get('/bookings', async (req,res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({user: userData.id}).populate('place'));
});


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');  
});
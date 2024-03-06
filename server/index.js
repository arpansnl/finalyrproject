// Load environment variables
import "./loadenvironment.js";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const Realm=(...args)=>import ('realm-web').then(()=>Realm(...args));
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
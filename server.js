#!/usr/bin/env node

import {rps, rpsls} from "./lib/rpsls.js";
import minimist from 'minimist';
import express from 'express';

const args = minimist(process.argv.slice(2)); 
const port = args["port"] || 5000;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(port);

app.get('/app/', (req, res) => {
	res.status(200).send('200 OK');
})

//Endpoint /app/rps/ that returns {"player":"(rock|paper|scissors)"}. (HINT: regex)

app.get('/app/rps/', (req, res) => {
    res.status(200).send(rps());
})

//Endpoint /app/rpsls/ that returns {"player":"(rock|paper|scissors|lizard|spock)"}.

app.get('/app/rpsls/', (req, res) => {
    res.status(200).send(rpsls());
})

//Endpoint /app/rps/play/ should accept request bodies in the following forms: shot=(rock|paper|scissors) (URLEncoded) or {"shot":"(rock|paper|scissors)"} (JSON) as data bodies and return {"player":"(rock|paper|scissors)","opponent":"(rock|paper|scissors)","result":"(win|lose|tie)"}.

app.get('/app/rps/play/', (req, res) => {
    res.status(200).send(rps(req.query.shot));
})

app.post('/app/rps/play/', (req, res) => {
    res.status(200).send(rps(req.body.shot));
})

//Endpoint /app/rpsls/play/ should accept request bodies in the following forms: shot=(rock|paper|scissors) (URLEncoded) or {"shot":"(rock|paper|scissors)"} (JSON) and return {"player":"(rock|paper|scissors)","opponent":"(rock|paper|scissors)","result":"(win|lose|tie)"}


app.get('/app/rpsls/play/', (req, res) => {
    res.status(200).send(rpsls(req.query.shot));
})

app.post('/app/rpsls/play/', (req, res) => {
    res.status(200).send(rpsls(req.body.shot));
})

//Endpoint /app/rpsls/play/(rock|paper|scissors)/ should return {"player":"(rock|paper|scissors)","opponent":"(rock|paper|scissors)","result":"(win|lose|tie)"}

app.get('/app/rps/play/:shot', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.params.shot)));
})

//Endpoint /app/rpsls/play/(rock|paper|scissors|lizard|spock)/ should return {"player":"(rock|paper|scissors|lizard|spock)","opponent":"(rock|paper|scissors|lizard|spock)","result":"(win|lose|tie)"}

app.get('/app/rpsls/play/:shot/', (req, res) => {
    res.status(200).send(rpsls(req.params.shot));
})

//if endpoint not defined return 404

app.get('*', (req, res) => {
    res.status(404).send('404 NOT FOUND');
})

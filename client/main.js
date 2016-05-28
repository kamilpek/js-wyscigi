import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import './main.html';

Punkty.insert({ name: "gracz1", score: 0});
Punkty.insert({ name: "gracz2", score: 0});
Punkty.insert({ name: "wygral", score: 0});
Punkty.insert({ name: "poziom", score: 0});

if (Meteor.isClient){
  Template.gra.onCreated(function helloOnCreated() {
    this.gracz1 = new ReactiveVar(0);
    this.gracz1.set(0);
    this.gracz2 = new ReactiveVar(0);
    this.gracz2.set(0);
    this.wygrany = new ReactiveVar(0);
    this.wygrany.set(0);
    this.poziom = new ReactiveVar(0);
    this.poziom.set(0);
  });

  Template.gra.helpers({
    gracz1: function() {
      return Template.instance().gracz1.get();
    },
    gracz2: function() {
      return Template.instance().gracz2.get();
    },
    wygrany: function() {
      return Template.instance().wygrany.get();
    },
    poziom: function() {
      return Template.instance().poziom.get();
    },
  });

  Template.gra.events({
    'click #btnpoziom1'(event, instance) {
      poziom = 100;
      var poz1 = Punkty.findOne({name:"poziom"})
      Punkty.update({_id: poz1._id}, { $set: { score: 1 }} );
      var poz1a = Punkty.findOne({"name":"poziom"}, {"score":1, "_id":0});
      var poz1b = poz1a.score;
      instance.poziom.set(poz1b);
    },
    'click #btnpoziom2'(event, instance) {
      poziom = 200;
      var poz2 = Punkty.findOne({name:"poziom"})
      Punkty.update({_id: poz2._id}, { $set: { score: 2 }} );
      var poz2a = Punkty.findOne({"name":"poziom"}, {"score":1, "_id":0});
      var poz2b = poz2a.score;
      instance.poziom.set(poz2b);
    },
    'click #btnpoziom3'(event, instance) {
      poziom = 300;
      var poz3 = Punkty.findOne({name:"poziom"})
      Punkty.update({_id: poz3._id}, { $set: { score: 3 }} );
      var poz3a = Punkty.findOne({"name":"poziom"}, {"score":1, "_id":0});
      var poz3b = poz3a.score;
      instance.poziom.set(poz3b);
    },
    'click #btngracz1'(event, instance) {
      var g1a = instance.gracz1.get();
      var g1b = Math.floor((Math.random() * 10) + 1);
      var g1wynik = g1a + g1b;
      var g1 = Punkty.findOne({name:"gracz1"})
      Punkty.update({_id: g1._id}, { $set: { score: g1wynik }} );
      var g1pkt = Punkty.findOne({"name":"gracz1"}, {"score":1, "_id":0});
      var pkt1 = g1pkt.score;
      instance.gracz1.set(pkt1);
      var g2pkt = Punkty.findOne({"name":"gracz2"}, {"score":1, "_id":0});
      var pkt2 = g2pkt.score;
      instance.gracz2.set(pkt2);
      if(g1wynik >= poziom) {
        instance.gracz1.set(0);
        instance.gracz2.set(0);
        var wyg1 = Punkty.findOne({name:"wygral"})
        Punkty.update({_id: wyg1._id}, { $set: { score: 1 }} );
        var wyg1pkt = Punkty.findOne({"name":"wygral"}, {"score":1, "_id":0});
        var wpkt1 = wyg2pkt.score;
        instance.wygrany.set(wpkt1);
      }
    },
    'click #btngracz2'(event, instance) {
      var g2a = instance.gracz2.get();
      var g2b = Math.floor((Math.random() * 10) + 1);
      var g2wynik = g2a + g2b;
      var g2 = Punkty.findOne({name:"gracz2"})
      Punkty.update({_id: g2._id}, { $set: { score: g2wynik }} );
      var g1pkt = Punkty.findOne({"name":"gracz1"}, {"score":1, "_id":0});
      var pkt1 = g1pkt.score;
      instance.gracz1.set(pkt1);
      var g2pkt = Punkty.findOne({"name":"gracz2"}, {"score":1, "_id":0});
      var pkt2 = g2pkt.score;
      instance.gracz2.set(pkt2);
      if(g2wynik >= poziom) {
        instance.gracz1.set(0);
        instance.gracz2.set(0);
        var wyg2 = Punkty.findOne({name:"wygral"})
        Punkty.update({_id: wyg2._id}, { $set: { score: 2 }} );
        var wyg2pkt = Punkty.findOne({"name":"wygral"}, {"score":1, "_id":0});
        var wpkt2 = wyg2pkt.score;
        instance.wygrany.set(wpkt2);
      }
    },
    'click #btnnowagra'(event, instance){
      var gr1 = Punkty.findOne({name:"gracz1"});
      var gr2 = Punkty.findOne({name:"gracz2"});
      var wyg = Punkty.findOne({name:"wygral"});
      var poz = Punkty.findOne({name:"poziom"});
      Punkty.remove({_id: gr1._id});
      Punkty.remove({_id: gr2._id});
      Punkty.remove({_id: wyg._id});
      Punkty.remove({_id: poz._id});
      Punkty.insert({ name: "gracz1", score: 0});
      Punkty.insert({ name: "gracz2", score: 0});
      Punkty.insert({ name: "wygral", score: 0});
      Punkty.insert({ name: "poziom", score: 0});wyg
      instance.gracz1.set(0);
      instance.gracz2.set(0);
      instance.wygrany.set(0);
      instance.poziom.set(0);
    },
    'click #btndolacz'(event, instance){
      var poz1a = Punkty.findOne({"name":"poziom"}, {"score":1, "_id":0});
      var poz1b = poz1a.score;
      instance.poziom.set(poz1b);
      var g1pkt = Punkty.findOne({"name":"gracz1"}, {"score":1, "_id":0});
      var pkt1 = g1pkt.score;
      instance.gracz1.set(pkt1);
      var g2pkt = Punkty.findOne({"name":"gracz2"}, {"score":1, "_id":0});
      var pkt2 = g2pkt.score;
      instance.gracz2.set(pkt2);
    }
  });
}

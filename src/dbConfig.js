
var iris4StandBy = {
  user: "doc_supp",
  password: "doc_supp1Prod",
  connectString: 'exn1-scan:1521/ir4sb.oocl'
};

var eucDB = {
  user: "DSHSP_OWNER",
  password: "dshsp_owner",
  connectString: 'hkln875p.oocl.com:1521/dshspdev.oocl'
  //tnsnames.ora way
  //connectString: 'DSHSPDEV'
};

module.exports = {
  iris4StandBy: iris4StandBy,
  eucDB: eucDB
};
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$notes = [
  [
    "id" => 1,
    "content" => "Text on card #1"
  ],
  [
    "id" => 2,
    "content" => "Text on card #2"
  ],
  [
    "id" => 3,
    "content" => "Text on card #3"
  ],
  [
    "id" => 4,
    "content" => "Text on card #4"
  ]
];

if($_SERVER["REQUEST_METHOD"] == "GET") {
  if (isset($_GET["delete"]) && $_GET["delete"] > 0){
    $temp = [];
    foreach ($notes as $note) {
      if($note["id"] != $_GET["delete"]){
        $temp[] = $note;
      }
    }
    $notes = $temp;
  }
  echo json_encode($notes);
} else if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);
  if (isset($data["id"])){
    if ($data["id"] > 0){
      foreach ($notes as $key => $note) {
        if($note["id"] == $data["id"]){
          $notes[$key]["content"] = $data["content"];
          continue;
        }
      }
    } else {
      $notes[] = [ "id" => count($notes)+1, "content" => $data["content"]];
    }
  }

  echo json_encode($notes);
} else {
    echo "method not found";
}
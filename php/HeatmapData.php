<?php
    //ini_set('memory_limit', '256M');
    //$afspath = $_SERVER["AeroFSdir"];
    $pltpar = $_GET['param'];
    $sqltblnm = $_GET['tablenm'];
    $begDate = $_GET['begDate'];
    $endDate = $_GET['endDate'];
    $tmCovrg = $_GET['tmCovrg'];

    //echo gethostname();
    //echo get_current_user();
    $currentUser = get_current_user();

    if (gethostname() == 'aramis.astro.yale.edu') {
        $afspath = "/mg/AeroFS/";    
    } else {
        $afspath = "/Users/" . $currentUser . "/AeroFS/";
    }
    
    if (gethostname() == 'exoplanets.astro.yale.edu') {
        $afspath = "/Library/WebServer/creds/";    
    }
    //  
    //echo $afspath;
    $credsfile = $afspath . '.credentials/SQL/cawsn';
    $file = file_get_contents($credsfile);
    //echo "hello";
    //echo "The host is: ";
    //echo $file[0];
    //echo $file;
    
    $creds = explode("\n", $file);
    //echo $creds[0];
    //echo "\n ";

    $host = $creds[0];
    $port = $creds[1];
    $username = $creds[2];
    $password = $creds[3];
    $database = $creds[4];

    
    $server = mysql_connect($host, $username, $password);
    //echo $server;
    //echo "\n";
    $connection = mysql_select_db($database, $server);
    //echo $connection;
    //echo "\n";

    $whereclause = 'WHERE ';

    if (isset($_GET['objectnm'])){
        $objectnm = $_GET['objectnm'];
        $whereclause += 'o.object = ' . $objectnm;
    }


    if ($tmCovrg !='Tm-Cvrg-All') {
        $myquery = "
        SELECT acknowledged_at, closed_at, created_at, category, neighborhood FROM nhrc WHERE created_at > '" . $begDate . "' AND created_at < '" . $endDate . "' ORDER BY created_at ASC;
        ";   
    }

    if ($tmCovrg =='Tm-Cvrg-All') {
        $myquery = "
        SELECT acknowledged_at, closed_at, created_at, category, neighborhood FROM nhrc ORDER BY created_at ASC;
        ";   
    }

    $query = mysql_query($myquery);
    
    if ( ! $query ) {
        echo mysql_error();
        die;
    }
    
    $data = array();
    
    for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $data[] = mysql_fetch_assoc($query);
    }
    
    echo json_encode($data);     
     
    mysql_close($server);
    //*/

?>
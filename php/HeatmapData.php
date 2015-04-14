<?php
    //ini_set('memory_limit', '256M');
    //$afspath = $_SERVER["AeroFSdir"];
    $pltpar = $_GET['param'];
    $sqltblnm = $_GET['tablenm'];
    $begDate = $_GET['begDate'];
    $endDate = $_GET['endDate'];
    $tmCovrg = $_GET['tmCovrg'];
    $ctgry = $_GET['ctgry'];
    $nbrhd = $_GET['nbrhd'];

    //echo gethostname();
    //echo get_current_user();
    $currentUser = get_current_user();

    if (gethostname() == 'ip-172-31-55-146') {
        $afspath = "/home/wwwuser/";    
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

    $whereclause = "WHERE ";

    //echo $whereclause;

    //echo $tmCovrg !='Tm-Cvrg-All';

    if ($tmCovrg !='Tm-Cvrg-All') {
        $whereclause = $whereclause . "created_at > '" . $begDate . "' AND created_at < '" . $endDate . "'";
    }

    //echo 'where after time coverage: ';
    //echo $whereclause;

    if (isset($_GET['ctgry']) and $ctgry != 'All') {
        if (strlen($whereclause) > 6) {
            $whereclause = $whereclause . ' AND';
        }

        $whereclause = $whereclause . " category = '" . $ctgry . "'";
    } else {
        $ctgry = 'All';
    }

    //echo 'where after category: ';
    //echo $whereclause;

    if (isset($_GET['nbrhd']) and $nbrhd != 'All') {
        if (strlen($whereclause) > 6) {
            $whereclause = $whereclause . ' AND';
        }

        $whereclause = $whereclause . " neighborhood = '" . $nbrhd . "'";
    } else {
        $nbrhd = 'All';
    }

    //echo $whereclause;


    if ($tmCovrg != 'Tm-Cvrg-All' or $ctgry != 'All' or $nbrhd != 'All') {
        $myquery = "
        SELECT acknowledged_at, closed_at, created_at, category, neighborhood, time_to_ack, time_to_cmp FROM nhrc " . $whereclause . " ORDER BY created_at ASC;";   
    } else {
        $myquery = "
        SELECT acknowledged_at, closed_at, created_at, category, neighborhood, time_to_ack, time_to_cmp FROM nhrc ORDER BY created_at ASC;";   
    }

    //echo $myquery;

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
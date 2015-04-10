\\This query takes the following variables:

\\level: name of polygon table containing relevant geometries (e.g., new haven wards, neighborhoods, census blocks)
\\category: issue category type, must match the categories used in the seeclickfix data
\\start_date: start date for query formatted as 'yyyy-mm-dd'
\\end_date: end date for query

\\This query returns a table containing 
\\geometry necessary for mapping
\\issue_count: number of issues
\\issues_acknowledged
\\issues_closed
\\pct_acknowledged
\\pct_closed
\\mean_close_time
\\mean_acknowledge_time
\\mean_acknowledge_to_close: time from acknowledged to closed
\\I'd like to add mean time open, but can't do that since we have no column for when the row was last updated in CartoDB.


query = "SELECT polygons.the_geom_webmercator, 
	count(points.the_geom) AS issue_count, 
	sum(CASE WHEN points.closed_at is not null THEN 1 ELSE 0 END) AS issues_closed, 
	sum(CASE WHEN points.acknowledged_at is not null THEN 1 ELSE 0 END) AS issues_acknowledged, 
	CAST(sum(CASE WHEN points.acknowledged_at is not null THEN 1 ELSE 0 END) AS DECIMAL) / count(points.the_geom) AS pct_acknowledged,
	CAST(sum(CASE WHEN points.closed_at is not null THEN 1 ELSE 0 END) AS DECIMAL) / count(points.the_geom) AS pct_closed, 
	avg(DATE_PART('day', points.closed_at - points.created_at)) AS mean_close_time, 
	avg(DATE_PART('day', points.acknowledged_at - points.created_at)) AS mean_acknowledge_time,
	avg(DATE_PART('day', points.closed_at - points.acknowledged_at)) AS mean_acknowledge_to_close
	FROM " + level + " as polygons LEFT JOIN (select * from scf_data where category in ('" + category + "') AND created_at <= '" + end_date + "' AND created_at >= '" + start_date + "') as points
	ON st_contains(polygons.the_geom,points.the_geom) 
	WHERE ST_Intersects(points.the_geom, polygons.the_geom)
	GROUP BY polygons.the_geom_webmercator"

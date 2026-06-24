import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
	stages: [
		{duration: '10s', target: 100},
		{duration: '30s', target: 100},
		{duration: '1m', target: 1000},
		{duration: '2m', target: 1000},
		{duration: '2m', target: 10000},
		{duration: '2m', target: 10000},
		{duration: '1m', target: 0},
	]
};

export default async function() {
	http.get('http://localhost/api/compute');
}

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
	stages: [
		{ duration: '1m',  target: 100 },    // Ramp: 0 → 100 users
		{ duration: '2m',  target: 500 },    // Ramp: 100 → 500 users
		{ duration: '2m',  target: 1000 },   // Ramp: 500 → 1000 users
		{ duration: '3m',  target: 1000 },   // Hold: 1000 users
		{ duration: '2m',  target: 0 },      // Ramp down
	],
	thresholds: {
		http_req_duration: ['p(95)<500'],    // 95% of requests under 500ms
		http_req_failed: ['rate<0.01'],      // Less than 1% failure rate = 99% uptime
    },


};

export default async function() {
	http.get('https://api.battlecluster.com/api/compute');
}

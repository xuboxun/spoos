import request from './request';

export function getObjectDetailApi(appKey, objectKey) {
    return `/api/object/${appKey}/${objectKey}`;
}

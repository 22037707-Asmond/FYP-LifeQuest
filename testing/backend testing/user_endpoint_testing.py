import pytest


@pytest.mark.order()
def test_user_endpoint(client):
    response = client.get('/user')
    assert response.status_code == 200
    assert response.json == {"message": "User endpoint"}
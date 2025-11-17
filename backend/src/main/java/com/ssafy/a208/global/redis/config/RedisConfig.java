package com.ssafy.a208.global.redis.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.List;

@Configuration
public class RedisConfig {

    /**
     * Redis Cluster 노드 목록
     * application-prod.yml에서 spring.data.redis.cluster.nodes 값을 주입받는다.
     * 예) nodes:
     *      - clustercfg.xxx.amazonaws.com:6379
     */
    @Value("${spring.data.redis.cluster.nodes}")
    private List<String> clusterNodes;

    /**
     * Redis Cluster 연결 Factory
     * SSL 활성화 + 리다이렉트 3회 설정
     */
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {

        RedisClusterConfiguration clusterConfig = new RedisClusterConfiguration(clusterNodes);
        clusterConfig.setMaxRedirects(3);  // cluster 모드 필수 옵션

        LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
                .useSsl()   // AWS ElastiCache Cluster Mode Enabled는 SSL 필수
                .build();

        return new LettuceConnectionFactory(clusterConfig, clientConfig);
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {

        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());

        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        template.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());

        template.afterPropertiesSet();
        return template;
    }
}